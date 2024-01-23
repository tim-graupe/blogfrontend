import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TEInput, TERipple } from "tw-elements-react";
import config from '../../configs';
interface LoginI {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginI>({
    username: '',
    password: '',
  });

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? config.development.apiUrl
      : config.production.apiUrl;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${apiUrl}/login`, {
      method: "POST",
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <h5 className="mt-0 mb-2 text-xl font-medium leading-tight text-primary">
        Login
      </h5>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <TEInput type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <TEInput type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <TERipple rippleColor="light">
          <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Submit
          </button>
        </TERipple>      </form>
      Not yet registered? <NavLink to="/register">       <a
        href="#!"
        className="transition duration-150 ease-in-out text-info hover:text-info-600 focus:text-info-600 active:text-info-700"
      >Signup here</a></NavLink>
    </div>
  );
};