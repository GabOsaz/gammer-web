import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
// import Card from '../components/common/Card';
// import Hyperlink from './../components/common/Hyperlink';
import Label from './../components/common/Label';
import FormInput from './../components/FormInput';
import FormSuccess from './../components/FormSuccess';
import FormError from './../components/FormError';
// import GradientBar from './../components/common/GradientBar';
import GradientButton from '../components/common/GradientButton';
import logo from './../images/logo.ico';
// import logo from './../images/logo.png';
// import { publicFetch } from './../util/fetch';
import { AuthContext } from '../context/AuthContext'
import { FetchContext } from '../context/FetchContext'
import HyperText from '../components/common/HyperText';
import { motion } from 'framer-motion';
// import { useHistory } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

const Login = ({showLogin}) => {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext)
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);

  const submitCredentials = async credentials => {
    try {
      setLoginLoading(true);
      const { data } = await fetchContext.authAxios.post('authenticate', credentials);
      // const { data } = await publicFetch.post('authenticate', credentials);
      authContext.setAuthState(data);
      // console.log(data);
      setLoginSuccess(data.message);
      setLoginError('');
      // redirect after successful login
      setTimeout(() => {
        setRedirectOnLogin(true)
      }, 700) 
    } catch (error) {
      setLoginLoading(false);
      setLoginSuccess(null);
      const { data, status, statusText } = error.response;
      if(status < 500) {
        setLoginError(data.message);
      } else {
        setLoginError(statusText);
      }
    }
  };

  return (
    <>
    {redirectOnLogin && <Redirect to="/registeredSchools"/>}
      {/* <section className="w-full h-screen m-auto p-8 sm:pt-8">
        <Card>
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> */}
            <motion.div className="max-w-md w-full" layoutId="underline">
              <div>
                <div className="w-full flex justify-center items-center mr-1 mb-6">
                  <img src={logo} alt="Logo" className='w-12' />
                  <h1 className='font-bold text-4xl text-blue-600'> Gammer </h1>
                </div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Log in to your account
                </h2>
                <p className="text-gray-600 text-center">
                  Go back to signup page?{' '}
                  <HyperText
                    text="Click here"
                    onClick={() => showLogin(false)}
                  />
                </p>
              </div>

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  role: 'admin'
                }}
                onSubmit={values =>
                  submitCredentials(values)
                }
                validationSchema={LoginSchema}
              >
                {() => (
                  <Form className="mt-8">
                    {loginSuccess && (
                      <FormSuccess text={loginSuccess} />
                    )}
                    {loginError && (
                      <FormError text={loginError} />
                    )}
                    <div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Email" />
                        </div>
                        <FormInput
                          ariaLabel="Email"
                          name="email"
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <Label text="Password" />
                        </div>
                        <FormInput
                          ariaLabel="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <GradientButton
                        type="submit"
                        text="Log In"
                        loading={loginLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          {/* </div>
        </Card>
      </section> */}
    </>
  );
};

export default Login;
