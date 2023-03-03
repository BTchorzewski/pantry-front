import './CreatePantryForm.css';
import { FormEvent, useRef } from 'react';
import { AxiosError } from 'axios';
import { usePantries } from '../../../hooks/usePantries';
import { useRefreshToken } from '../../../hooks/useRefreshToken';
import { useAxios } from '../../../hooks/useAxios';
import { useDispatch } from 'react-redux';
import { addShortPantries } from '../../../redux/pantriesSlice/pantriesSlice';

export const CreatePantryForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const createPantry = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (nameRef?.current?.value.length) {
        const pantryName = { name: nameRef.current.value };
        // @ts-ignore
        dispatch(addShortPantries(pantryName));
        formRef?.current?.reset();
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        console.log(e);
      }
    }
  };

  return (
    <form onSubmit={createPantry} className='CreatePantry__form' ref={formRef}>
      <label className='CreatePantry__label'>
        Name:
        <input className='CreatePantry__input' type='text' ref={nameRef} />
      </label>
      <button type={'submit'}>Create pantry</button>
    </form>
  );
};
