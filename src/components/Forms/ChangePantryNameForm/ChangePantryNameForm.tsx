import './ChangePantryNameForm.css';
import { AxiosError } from 'axios';
import React, { useRef } from 'react';

interface Props {
  pantryId: string;
  toggleShow: () => void;
}

export const ChangePantryNameForm = ({ pantryId, toggleShow }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const updateName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (nameRef?.current?.value) {
      }
      toggleShow();
    } catch (e) {
      if (e instanceof AxiosError) {
        console.error('Change pantry name component: error- ', e);
      }
    }
  };
  return (
    <form onSubmit={updateName} className='UpdatePantryForm'>
      <label className='UpdatePantryForm__label'>
        Change name:
        <input type='text' ref={nameRef} className='UpdatePantryForm__input' />
      </label>
      <button type='submit' className='UpdatePantryForm__button'>
        Update
      </button>
    </form>
  );
};
