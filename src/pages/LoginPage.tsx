import React, { useEffect, useRef } from 'react';
import { basicRoute, protectedBasicRoute } from '../utils/fetch';
import { InvalidLoginRes, LoginReq, LoginRes } from '../types';
import { AxiosError } from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
export const LoginPage = () => {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: loginRef?.current?.value,
      password: passwordRef?.current?.value,
    } as LoginReq;
    console.log('login');
    try {
      const results = await protectedBasicRoute.post('/auth/login', data);
      if (results.status === 200) {
        const { accessToken } = (await results.data) as LoginRes;
        // @ts-ignore
        const decodedToken = jwtDecode(accessToken);
        console.log(decodedToken);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    if (user !== null) navigate('/pantries');
  }, [user]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className='Form' onSubmit={onSubmit}>
      <label htmlFor='email' className='Form__label'>
        Email
        <input type='text' className='Form__input' id='email' ref={loginRef} />
      </label>
      <label htmlFor='password' className='Form__label'>
        Password:
        <input
          type='password'
          className='Form__input'
          id='password'
          ref={passwordRef}
        />
      </label>
      <button className='button' type={'submit'}>
        Login
      </button>
      token: {user}
    </form>
  );
};
