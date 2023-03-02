import './CreatePantryForm.css';
import { FormEvent, useRef } from 'react';
import { basicRoute } from '../../../utils/fetch';
import { CreatePantryResponse } from '../../../types';
import { AxiosError } from 'axios';
import { usePantries } from '../../../hooks/usePantries';
import { useBearerToken } from '../../../hooks/useBearerToken';
import { useRefreshToken } from '../../../hooks/useRefreshToken';
import { useAxios } from '../../../hooks/useAxios';
import { useDispatch } from 'react-redux';
import { addShortPantries } from '../../../redux/pantriesSlice/pantriesSlice';
import { current } from '@reduxjs/toolkit';

export const CreatePantryForm = () => {
  const { addPantryToContext } = usePantries();
  const refreshToken = useRefreshToken();
  const nameRef = useRef<HTMLInputElement>(null);
  const basicRoute = useAxios();
  const dispatch = useDispatch();
  const createPantry = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (nameRef?.current?.value.length) {
        const pantryName = { name: nameRef.current.value };
        // @ts-ignore
        dispatch(addShortPantries(pantryName));
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        console.log(e);
      }
    }
  };

  return (
    <form onSubmit={createPantry} className='CreatePantry__form'>
      <label className='CreatePantry__label'>
        Name:
        <input className='CreatePantry__input' type='text' ref={nameRef} />
      </label>
      <button type={'submit'}>Create pantry</button>
    </form>
  );
};
