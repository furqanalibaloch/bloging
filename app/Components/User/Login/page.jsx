
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    setError(''); // Clear any previous errors

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/users/Login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: user,
    };

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        alert(response.data.message);
        localStorage.setItem('user_id', response.data.data._id);

        // Check if login was successful before navigating
        if (response.data.message === 'User Login') {
          router.push('/Components/Blogss/Home');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        setError('Login failed. Please check your credentials.'); // Set an error message
      });
  };

  const gotologin = () => {
    router.push('/Components/User/SignUp');
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-x-4 border-t-4 border-green-400">
        <h1 className="text-xl text-center font-bold my-4"> User Log In</h1>

        <div className="flex flex-col gap-3">
          <Input
            handleChange={handleChange}
            type="email"
            placeholder={'Enter Email'}
            value={user.email}
            name="email"
          />
        </div>
        <br />
        <div>
          <Input
            handleChange={handleChange}
            type="password"
            placeholder={'Enter Password'}
            value={user.password}
            name="password"
          />
        </div>
        <div>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white w-80 mt-4 ml-10 font-bold cursor-pointer px-6 py-2"
              >
                Login
              </button>

              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 m-auto text-center rounded-md mt-2">
                  {error}
                </div>
              )}
            </>
          )}

          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 m-auto text-center rounded-md mt-2">
            Don't have an account?{' '}
            <span
              className="text-sm mt-3 text-right no-underline cursor-pointer "
              onClick={gotologin}
            >
              {' '}
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Input = ({ type, placeholder, value, name, handleChange }) => {
  return (
    <input
      className="border-2 "
      value={value}
      onChange={(e) => handleChange(e)}
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default Login;
