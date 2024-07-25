import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
    let { setToken, Token, setUser } = useContext(UserContext)
    let [apiResponse, setApiResponse] = useState();
    let [loading, setLoading] = useState(false);
    let navigator = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    async function handleLogin(formValues) {
        setLoading(true);
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues);
            console.log(response?.data.token);
            navigator('/');
            setLoading(false);
            setToken(response?.data.token)
            localStorage.setItem('Token', response?.data.token)
            // ^ user 
            setUser(response.data.user)
            localStorage.setItem('User', JSON.stringify(response.data.user))
        } catch (error) {
            console.log(error);
            setApiResponse(error?.response?.data?.message);
            setLoading(false);
        }
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: ''
        },
        validationSchema,
        onSubmit: handleLogin
    });

    return (
        <div className='max-w-xl my-8 lg:max-w-3xl w-full'>
            <form className="mx-auto" onSubmit={formik.handleSubmit}>
                <h4 className='md:text-5xl text-3xl mb-4 font-bold text-center text-green-500'>Login Now</h4>

                <div className='flex flex-col  gap-6'>


                    <div className=''>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            className="bg-gray-50 border placeholder:text-[16px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#3bb77e] focus:border-[#3bb77e] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Email"

                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="p-2 m-0 text-sm  text-red-800" role="alert">
                                <span className="font-bold"> * {formik.errors.email}</span>
                            </div>
                        )}
                    </div>


                    <div className=''>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            className="bg-gray-50 border placeholder:text-[16px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#3bb77e] focus:border-[#3bb77e] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Your Password"

                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="p-2 m-0 text-sm  text-red-800" role="alert">
                                <span className="font-bold"> * {formik.errors.password}</span>
                            </div>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="text-white text-md w-full transition-colors duration-300 bg-green-500 hover:bg-[#33a06d]  focus:outline-[#33a06d]  font-medium rounded-lg   sm:w-auto px-5 py-2.5 text-center dark:bg-[#3bb77e] dark:hover:bg-[#3bb77e] dark:focus:ring-[#3bb77e]"
                    >
                        {loading ? <i className="fa fa-spin fa-spinner fs-6"></i> : 'Login'}
                    </button>
                    {apiResponse && (
                        <div className="p-4 m-0 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{apiResponse}</span>
                        </div>
                    )}
                </div>
                <div className='text-md pt-4  flex justify-center items-center text-green-500'>
                    <Link to='/Register'>I dont have an account ?</Link>
                </div>


            </form>
        </div>
    );
}
