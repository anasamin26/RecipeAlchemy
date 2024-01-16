import React, { useState } from 'react';
import BubbleText from '../../aesthetics/BubbleText';

const Signup = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = () => {
    if (!email.includes('@') || !email.includes('.com')) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-purple-600">
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex self-center mb-8 sm:block hidden">
        <div className=' flex self-center  mb-40 z-10 rounded-3xl'>
            <h1 className='text-purple-300 text-9xl font-secondary'>R</h1>   
            <h1 className='mt-12 text-purple-300 text-6xl font-secondary'>e</h1>   
            <h1 className='mt-12 text-purple-300 text-6xl font-secondary'>c</h1>   
            <h1 className='mt-12 text-purple-300 text-6xl font-secondary'>i</h1>
            <h1 className='mt-12 text-purple-300 text-6xl font-secondary'>p</h1>   
            <h1 className='mt-12 text-purple-300 text-6xl font-secondary'>e</h1>   
            <h1 className='text-white text-9xl font-secondary' >A</h1>   
            <h1 className='mt-12 text-white text-6xl font-secondary'>l</h1>   
            <h1 className='mt-12 text-white text-6xl font-secondary'>c</h1>   
            <h1 className='mt-12 text-white text-6xl font-secondary'>h</h1>
            <h1 className='mt-12 text-white text-6xl font-secondary'>e</h1>   
            <h1 className='mt-12 text-white text-6xl font-secondary'>m</h1>  
            <h1 className='mt-12 text-white text-6xl font-secondary'>y</h1>    
        </div>
        </div>
        <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10 mb-16">
          <div className="self-start lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-5xl lg:mr-12">
              <BubbleText text="Create an Account" />
            </h1>
            <p className="pr-3 text-sm opacity-75">Embark on a journey of flavors! Join us and discover a world of delightful recipes with just a sign-up away.</p>
          </div>
        </div>

        <div className="flex justify-center self-center z-10 mb-16">
          <div className="p-8 bg-white mx-auto rounded-3xl w-96">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Register</h3>
              <p className="text-gray-400">Already have an account? <a href="/signin" className="text-sm text-purple-700 hover:text-purple-700 underline">Sign In</a></p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col mb-4">
                <input
                  className="text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className="mt-2 text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input
                  className={`w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 ${emailError ? 'border-red-500' : ''}`}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <div className="relative">
                <input
                  placeholder="Password"
                  type={show ? 'password' : 'text'}
                  className="text-sm text-black px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                />
                <div className="flex items-center absolute inset-y-0 right-0 mr-3 text-sm leading-5">
                  <svg
                    onClick={() => setShow(!show)}
                    className={`h-4 text-purple-700 ${show ? 'hidden' : 'block'}`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    {/* ... Path for the eye icon when password is hidden */}
                  </svg>

                  <svg
                    onClick={() => setShow(!show)}
                    className={`h-4 text-purple-700 ${show ? 'block' : 'hidden'}`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    {/* ... Path for the eye-slash icon when password is shown */}
                  </svg>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-purple-600 hover:bg-purple-800 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-100"></span>
                <span className="text-gray-300 font-normal">or</span>
                <span className="h-px w-16 bg-gray-100"></span>
              </div>
              <div className="flex justify-center gap-5 w-full">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
                >
                  <svg
                    className="w-4 mr-2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                    ></path>
                    <path
                      fill="#4A90E2"
                      d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                    ></path>
                  </svg>
                  <span>Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg className="absolute bottom-0 left-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#fff" fillOpacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </svg>

      <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"></script>
    </div>
  );
};

export default Signup;
