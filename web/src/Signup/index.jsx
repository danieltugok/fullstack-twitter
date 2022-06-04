import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"/>
)

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})

export function Signup({signInUser}){
  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`, {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password
      })

      signInUser(res.data);
    },
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    validateOnMount:true,
  })

  return(
    <div className="h-full flex flex-col justify-center p-10 space-y-6">
      <h1 className="text-3xl">Create your account</h1>
      <form action="" className="space-y-6" onSubmit={formik.handleSubmit}>
        <div className='space-y-2'>
          <Input
            placeholder="Name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {(formik.touched.name && formik.errors.name) && (
            <div className='text-red-500 text-sm mt-2'> {formik.errors.name}</div>
          )}
        </div>

        <div className='space-y-2'>
          <Input
            placeholder="Username"
            name="username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {(formik.touched.username && formik.errors.username) && (
            <div className='text-red-500 text-sm mt-2'> {formik.errors.username}</div>
          )}
        </div>

        <div className='space-y-2'>
          <Input
            placeholder="E-mail"
            name="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
          />
          {(formik.touched.email && formik.errors.email) && (
            <div className='text-red-500 text-sm mt-2'> {formik.errors.email}</div>
          )}
        </div>


        <div className='space-y-2'>
          <Input
            placeholder="Senha"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            />
          {(formik.touched.password && formik.errors.password) && (
            <div className='text-red-500 text-sm mt-2'> {formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-birdBlue w-full py-2 rounded-full disabled:opacity-50 text-lg"
          disabled={formik.isSubmitting || !formik.isValid}          
        >
          {formik.isSubmitting ? 'Loading...' : 'Register'}
          </button>
      </form>
      <span className="text-sm text-silver text-center">
        Already have an Account? <a href="/login" className="text-birdBlue">Access</a>
      </span>
    </div>
  )
}