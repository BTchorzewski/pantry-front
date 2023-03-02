import React, { useEffect, useRef } from 'react';
import { JwtPayload, LoginReq, LoginRes } from '../types';
import { AxiosError, AxiosInstance } from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, login } from '../redux/authSlice/authSlice';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const authStore = useSelector(authSelector);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: loginRef?.current?.value,
      password: passwordRef?.current?.value,
    } as LoginReq;
    // @ts-ignore
    await dispatch(login(data));
  };

  if (authStore.auth.isAuth) {
    navigate('/pantries');
  }

  return (
    <>
      <form className='Form' onSubmit={onSubmit}>
        <label htmlFor='email' className='Form__label'>
          Email
          <input
            type='text'
            className='Form__input'
            id='email'
            ref={loginRef}
          />
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
    </>
  );
};
