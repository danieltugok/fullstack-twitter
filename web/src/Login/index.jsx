import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"/>
)

const validationSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})

export function Login({signInUser}){
  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios.get('http://localhost:9901/login', {
        auth: {
          username: values.email,
          password: values.password
        }
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
      <h1 className="text-3xl">Access to your account</h1>
      <form action="" className="space-y-6" onSubmit={formik.handleSubmit}>
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
          {formik.isSubmitting ? 'Loading...' : 'Login'}
          </button>
      </form>
      <span className="text-sm text-silver text-center">
        Not registered? <a href="" className="text-birdBlue">Register</a>
      </span>
    </div>
  )
}