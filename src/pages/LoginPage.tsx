import React, { useRef } from 'react';
import { basicRoute } from '../utils/fetch';
import { InvalidLoginRes, LoginReq, LoginRes } from '../types';
import { AxiosError } from 'axios';
export const LoginPage = () => {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: loginRef?.current?.value,
      password: passwordRef?.current?.value,
    } as LoginReq;

    console.log(data);
    try {
      const results = await basicRoute.post('/auth/login', data);
      if (results.status === 200) {
        const { accessToken } = results.data as LoginRes;
        console.log({ accessToken });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

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
    </form>
  );
};
