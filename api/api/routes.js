import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const router = new Router();

const prisma = new PrismaClient();

router.get('/tweets', async ctx => {
  const [, token] = ctx.request.headers?.authorization?.split(' ') || []  

  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);    
    const tweets = await prisma.tweet.findMany({
      include: {
        user:true
      }
    });
    ctx.body = tweets;  
  } catch (error) {
    ctx.status = 401;
    return;    
  }
});

router.post('/tweets', async ctx => {
  const [, token] = ctx.request.headers?.authorization?.split(' ') || []

  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);    
    const tweet = await prisma.tweet.create({
      data: {
        userId: payload.sub,
        text: ctx.request.body.text,
      }
    })  
    
    ctx.body = tweet;

  } catch (error) {
    ctx.status = 401;
    return;    
  }  
  
});

router.delete('/tweets/:id', async ctx => {
  const { id } = ctx.params;
  const tweet = await prisma.tweet.delete({
    where: { id }
  })



  ctx.body = tweet;
});


router.post('/signup', async ctx => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(ctx.request.body.password, saltRounds);

  try {

    // destructuring to remove password from response
    const { password, ...user} = await prisma.user.create({
      data: {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        username: ctx.request.body.username,
        password: hash
      }
    })

    const accessToken = jwt.sign({
      sub: user.id,
    }, process.env.JWT_SECRET, {expiresIn: '24h'});

    user.accessToken = accessToken;
  
    ctx.body = user;
    
  } catch (error) {
    if( error.code === 'P2002' ) {
      ctx.status = 422;
      ctx.body = {
        message: 'User or email already exists'
      }
      return;
    }

    ctx.status = 500;
    ctx.body = "Internal error";
  }  
})

router.get('/login', async ctx => {
  const [, auth] = ctx.request.headers.authorization.split(' ');
  const [email, plainTextPassword] = Buffer.from(auth, 'base64').toString().split(':');  

  // destructuring to remove password from response
  const {password, ...user} = await prisma.user.findUnique({
    where: { email }
  })
  console.log("🚀 ~ file: routes.js ~ line 74 ~ user", user)

  if( !user ) {
    ctx.status = 404;
    ctx.body = {
      message: 'User not found'
    }
    return;
  }

  const isPasswordValid = bcrypt.compareSync(plainTextPassword, password);

  if( !isPasswordValid ) {
    ctx.status = 401;
    ctx.body = {
      message: 'Invalid password'
    }
    return;
  }

  const accessToken = jwt.sign({
    sub: user.id,
  }, process.env.JWT_SECRET, {expiresIn: '24h'});

  user.accessToken = accessToken;

  ctx.body = user;
})