import { useFormik } from 'formik';
import * as Yup from 'yup'; // Optional: for validation
import { Link } from 'react-router-dom';
import DashboardHeader from '../../components/layout/DashboardHeader';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Email:', values.email);
      console.log('Password:', values.password);
      // Replace with your backend API call
    },
  });

  return (
    <div className='sticky'>
      <DashboardHeader />
      <div className="flex items-center justify-center min-h-[92vh] bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>

            <div className="text-center">
              <Link to="/forgot-password" className="text-sm py-0 text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <p className='flex justify-center'>
              Not registered? <Link to="/signup" className='underline text-blue-600 cursor-pointer ml-1'>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
