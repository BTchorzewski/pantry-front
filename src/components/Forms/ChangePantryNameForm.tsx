import './ChangePantryNameForm.css';
import { protectedBasicRoute } from '../../utils/fetch';
import { AxiosError } from 'axios';
import { usePantries } from '../../hooks/usePantries';
import { useRefreshToken } from '../../hooks/useRefreshToken';
import { useBearerToken } from '../../hooks/useBearerToken';
import React, { useRef } from 'react';

interface Props {
  pantryId: string;
  toggleShow: () => void;
}

export const ChangePantryNameForm = ({ pantryId, toggleShow }: Props) => {
  const { updatePantry } = usePantries();
  const refreshToken = useRefreshToken();
  const bearer = useBearerToken();
  const nameRef = useRef<HTMLInputElement>(null);

  const updateName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (nameRef?.current?.value) {
        console.log(nameRef?.current?.value);
        const result = await protectedBasicRoute.put(
          `/pantry/${pantryId}`,
          {
            name: nameRef.current.value,
          },
          bearer
        );

        updatePantry(pantryId, nameRef.current.value);
      }
      toggleShow();
    } catch (e) {
      if (e instanceof AxiosError) {
        await refreshToken();
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
