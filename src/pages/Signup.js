import React, { useState, useContext, useRef } from 'react';
// import { Redirect } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Card from '../components/common/Card';
import GradientButton from '../components/common/GradientButton';
import HyperText from '../components/common/HyperText';
import Label from '../components/common/Label';
import FormInput from '../components/FormInput';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';
import { publicFetch } from './../util/fetch';
import { AuthContext } from '../context/AuthContext'
import Login from './Login';
import DismissDd from '../components/common/DismissDd';
import NigerianStatesDd from '../components/NigerianStatesDd';
import { motion } from 'framer-motion'

const SignupSchema = Yup.object().shape({
  schoolName: Yup.string().required(
    'School name is required'
  ),
  year: Yup.string().required(
    'Year is required'
  ),
  firstName: Yup.string().required(
    'First name is required'
  ),
  lastName: Yup.string().required(
    'Last name is required'
  ),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phoneNumber: Yup.string().required(
    'Phone number of game master is required'
  )
});

const Signup = () => {
  const authContext = useContext(AuthContext)
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showDd, setShowDd] = useState(false);
  const [grabbedState, setGrabbedState] = useState('')

  const dDRef = useRef(null)

  const submitCredentials = async credentials => {
    const newCredentials = {...credentials, state: grabbedState}
    try {
      setLoginLoading(true);
      const { data } = await publicFetch.post('register_school', newCredentials);
      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError('');
      setLoginLoading(false);
    } catch (error) {
      setLoginLoading(false);
      setSignupSuccess(null);
      const { data, status, statusText } = error.response;
      if(status < 500) {
        setSignupError(data.message ? data.message : statusText);
      } else {
        setSignupError(statusText);
      }
    }
  };

  return (
    <>
      {
      <motion.section className="lg:w-480 lg:m-auto sm:pt-8 lg:pr-6 relative" layoutId="underline">
        <Card>
          <div className='w-full flex justify-center'>
          <div className="flex items-center h-full overflow-y-auto justify-center py-12 px-4 w-full sm:px-6 lg:px-8">
            {showAdminLogin ?
            <Login showLogin = {setShowAdminLogin} /> :
            <div className="max-w-md w-full">
              <div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Sign up for a spot!
                </h2>
                <p className="text-gray-600 text-center">
                  Are you an admin?{' '}
                  <HyperText
                    onClick={() => setShowAdminLogin(true)}
                    text="Log in now" 
                  />
                </p>
              </div>
              <Formik
                initialValues={{
                  schoolName: '',
                  year: '',
                  email: '',
                  phoneNumber: '',
                  firstName: '',
                  lastName: '',
                }}
                onSubmit={values =>
                  submitCredentials(values)
                }
                validationSchema={SignupSchema}
              >
                {() => (
                  <Form className="mt-8">
                    {signupSuccess && (
                      <FormSuccess text={signupSuccess} />
                    )}
                    {signupError && (
                      <FormError text={signupError} />
                    )}
                    <input
                      type="hidden"
                      name="remember"
                      value="true"
                    />
                    <div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="School Name" />
                        </div>
                        <FormInput
                          ariaLabel="School name"
                          name="schoolName"
                          type="text"
                          placeholder="Type your school's name"
                        />
                      </div>
                      <div className="mb-2 relative">
                        <div className="mb-1">
                          <Label text="State" />
                        </div>
                        <div onClick={() => setShowDd(true)}>
                          <input
                            aria-label="State"
                            name="state"
                            type="text"
                            value={grabbedState}
                            placeholder="Select state"
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                            readOnly='readonly'
                          />
                        </div>
                        {showDd && 
                          <DismissDd theRef={dDRef} toggleDd={() => setShowDd(false)}>
                            <div ref={dDRef} className='absolute top-18 z-20 left-0 w-full myShadow rounded-lg overflow-auto'>
                                <NigerianStatesDd
                                  setShowDd = {setShowDd}
                                  setGrabbedState = {setGrabbedState}
                                />
                            </div>
                          </DismissDd>
                        }
                      </div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Year Founded" />
                        </div>
                        <FormInput
                          ariaLabel="Year"
                          name="year"
                          type="text"
                          placeholder="Type the year your school was founded"
                        />
                      </div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Email Address" />
                        </div>
                        <FormInput
                          ariaLabel="Email address"
                          name="email"
                          type="email"
                          placeholder="Email address"
                        />
                      </div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Game Master Phone Number" />
                        </div>
                        <FormInput
                          ariaLabel="Phone number"
                          name="phoneNumber"
                          type="text"
                          placeholder="Type phone number"
                        />
                      </div>
                      <div className="flex">
                        <div className="mb-2 mr-2 w-1/2">
                          <div className="mb-1">
                            <Label text="First Name" />
                          </div>
                          <FormInput
                            ariaLabel="First Name"
                            name="firstName"
                            type="text"
                            placeholder="First name of game master"
                          />
                        </div>
                        <div className="mb-2 ml-2 w-1/2">
                          <div className="mb-1">
                            <Label text="Last Name" />
                          </div>
                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Last name of game master"
                          />
                        </div>
                      </div>
                      
                    </div>

                    <div className="mt-6">
                      <GradientButton
                        type="submit"
                        text="Sign Up"
                        loading={loginLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            }
          </div>
          </div>
        </Card>
      </motion.section>
      }
    </>
  );
};

export default Signup;
