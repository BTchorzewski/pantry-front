import React, { useRef, useState } from 'react';
import { basicRoute } from '../../utils/fetch';
import { AxiosError } from 'axios';
import { UserRegistrationReq, UserRegistrationRes } from '../../types';
import { Button } from '@mui/material';

export const RegistrationPage = () => {
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const clearNotifications = () => {
    setErrorMsg(null);
    setSuccessMsg(false);
  };

  const onSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const results = await basicRoute.post(
        'http://localhost:3001/user/registration',
        {
          email: emailRef?.current?.value,
          password: passwordRef?.current?.value,
        } as UserRegistrationReq
      );
      if (results?.status === 201) {
        setSuccessMsg(true);
        setTimeout(clearNotifications, 2000);
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const { message } = e.response?.data as UserRegistrationRes;
        setErrorMsg(message);
        setTimeout(clearNotifications, 2000);
      }
    }
  };
  return (
    <>
      {errorMsg !== null ? <p>{errorMsg}</p> : null}

      {successMsg ? (
        <p>please, check your email address to confirm your registration.</p>
      ) : null}
      <form className='RegistrationPage'>
        <label htmlFor='' className='RegistrationPage__label'>
          Email:
          <input
            type='text'
            className='RegistrationPage__input'
            id='text'
            ref={emailRef}
          />
        </label>
        <label htmlFor='' className='RegistrationPage__label'>
          Password
          <input
            type='text'
            className='RegistrationPage__input'
            ref={passwordRef}
          />
        </label>
        <Button
          variant={'contained'}
          color={'primary'}
          size={'medium'}
          type={'submit'}
          onSubmit={onSubmit}
        >
          Register
        </Button>
      </form>
    </>
  );
};
