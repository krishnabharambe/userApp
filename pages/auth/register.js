import { LockClosedIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { setCookies } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/react';
export default function Home() {
  const { data: session, status } = useSession();
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isOtpValid, setisOtpValid] = useState(false);
  const [isRegSuccess, setisRegSuccess] = useState(false);
  const [phoneState, setphone] = useState('');
  const [_Error, set_Error] = useState({ status: false, detail: '' });

  const HandleRegisterSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password = data.get('password');
    const cpassword = data.get('cpassword');

    if (password == cpassword) {
      const res = await axios.post(
        'https://krishnabharambe.pythonanywhere.com/api/register/',
        {
          phone: phoneState,
          password: password,
        }
      );
      if (res.data.status) {
        //registration successful
        setisRegSuccess(true);
      } else {
        set_Error({ status: true, detail: res.data.detail });
      }
    } else {
      set_Error({ status: true, detail: 'Please check password.' });
    }
  };

  const HandleOtpSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const otp = data.get('otp');
    // eslint-disable-next-line no-console
    if (otp) {
      const res = await axios.post(
        'https://krishnabharambe.pythonanywhere.com/api/ValidateOTP/',
        {
          phone: phoneState,
          otp: otp,
        }
      );
      if (res.data.status) {
        setisOtpValid(true);
      } else {
        set_Error({ status: true, detail: res.data.detail });
      }
      console.log(res);
    } else {
      set_Error({ status: true, detail: 'Please Enter OTP' });
    }
  };

  const HandleValidatePhone = async (event) => {
    event.preventDefault();
    set_Error({ status: false, detail: '' });
    const data = new FormData(event.currentTarget);
    const phone = data.get('phone');
    // eslint-disable-next-line no-console
    if (phone) {
      const phonenoRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (phone.match(phonenoRegEx)) {
        // set_Error({ status: false, detail: "Invalid Mobile number, Please Enter Valid Phone Number." })
        setCookies('phone', phone.toString());
        setphone(phone);
        const res = await axios.post(
          'https://krishnabharambe.pythonanywhere.com/api/ValidatePhone/',
          { phone }
        );
        if (res.data.status) {
          //success
          setIsOtpGenerated(true);
        } else {
          //failure
          set_Error({
            status: true,
            detail: 'Phone is already registered with us. Please go to Login.',
          });
        }
      } else {
        set_Error({
          status: true,
          detail: 'Invalid Mobile number, Please Enter Valid Phone Number.',
        });
      }
    } else {
      set_Error({
        status: true,
        detail: 'Invalid Mobile number, Please Enter Valid Phone Number.',
      });
    }
  };

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className="">
      {isRegSuccess ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
          }}
        >
          <p className="text-xl">
            <img
              src="/svg/AccountCreated.svg"
              alt="Searching...."
              color="red"
              width={300}
            />
          </p>
          <br />

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="mt-2 text-center text-sm text-gray-600">
              Registration Complete. Please go to Login. <br />
              <Link
                href="/auth/index"
                className="mt-2 group relative w-half flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </Link>
            </p>
          </p>
        </div>
      ) : (
        <div>
          {' '}
          {isOtpValid ? (
            <div className="min-h-full flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create to your account
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    <Link
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Create new Password
                    </Link>
                  </p>
                </div>
                <form
                  className="mt-8 space-y-6"
                  noValidate
                  onSubmit={HandleRegisterSubmit}
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Passwrord
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Password"
                      />
                    </div>

                    <label
                      htmlFor="cpassword"
                      className="block text-sm font-medium text-gray-700 mt-4"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="password"
                        name="cpassword"
                        id="cpassword"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                  {_Error.status ? (
                    <p className="mt-2 text-center text-sm text-red-600">
                      {_Error.detail}
                    </p>
                  ) : (
                    ''
                  )}
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                      Set Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div>
              {isOtpGenerated ? (
                <div className="min-h-full flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full space-y-8">
                    <div>
                      <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                      />
                      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create to your account
                      </h2>
                      <p className="mt-2 text-center text-sm text-gray-600">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Enter the OTP you’ve received
                        </Link>
                      </p>
                    </div>
                    <form
                      className="mt-8 space-y-6"
                      noValidate
                      onSubmit={HandleOtpSubmit}
                    >
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">OTP </span>
                        </div>
                        <input
                          type="text"
                          name="otp"
                          id="otp"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {_Error.status ? (
                        <p className="mt-2 text-center text-sm text-red-600">
                          {_Error.detail}
                        </p>
                      ) : (
                        ''
                      )}
                      <div>
                        <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                          VERIFY OTP
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="min-h-full flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full space-y-8">
                    <div>
                      <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                      />
                      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create to your account
                      </h2>
                      <p className="mt-2 text-center text-sm text-gray-600">
                        <Link
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Enter Your 10 digit Phone Number
                        </Link>
                      </p>
                    </div>
                    <form
                      className="mt-8 space-y-6"
                      noValidate
                      onSubmit={HandleValidatePhone}
                    >
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">+91 </span>
                        </div>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {_Error.status ? (
                        <p className="mt-2 text-center text-sm text-red-600">
                          {_Error.detail}
                        </p>
                      ) : (
                        ''
                      )}
                      <div>
                        <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                          GET OTP
                        </button>
                      </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-gray-600">
                      Already Have account?{' '}
                      <Link
                        href="/auth/"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Login Here
                      </Link>
                    </p>
                    <p className="mt-1 text-center text-sm text-gray-600">
                      I agree with your <br />
                      <Link
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Terms and Conditions
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
