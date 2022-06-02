import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';


export const router = new Router();

const prisma = new PrismaClient();

router.get('/tweets', async ctx => {
  const tweets = await prisma.tweet.findMany();
  ctx.body = tweets;  
})
router.post('/tweets', async ctx => {
  const tweet = {
    userId: 'cl3wi6usp0009ikc3y67jiea9',
    text: ctx.request.body.text,
  }

  const doc = await prisma.tweet.create({
    data: tweet
  })

  ctx.body = doc;
})
router.delete('/tweets/:id', async ctx => {
  const { id } = ctx.params;
  const doc = await prisma.tweet.delete({
    where: { id }
  })

  ctx.body = doc;
});