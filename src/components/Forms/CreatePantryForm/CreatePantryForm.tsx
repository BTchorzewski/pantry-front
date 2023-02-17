import './CreatePantryForm.css';
import { FormEvent, useRef } from 'react';
import { basicRoute } from '../../../utils/fetch';
import { CreatePantryResponse } from '../../../types';
import { AxiosError } from 'axios';
import { usePantries } from '../../../hooks/usePantries';
import { useBearerToken } from '../../../hooks/useBearerToken';
import { useRefreshToken } from '../../../hooks/useRefreshToken';
import { useAxios } from '../../../hooks/useAxios';

export const CreatePantryForm = () => {
  const { addPantryToContext } = usePantries();
  const bearer = useBearerToken();
  const refreshToken = useRefreshToken();
  const nameRef = useRef<HTMLInputElement>(null);
  const basicRoute = useAxios();
  const createPantry = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (nameRef?.current?.value.length) {
        const results = await (
          await basicRoute
        ).post('/pantry', { name: nameRef.current.value });

        const { pantryId: id } = results.data as CreatePantryResponse;

        if (id !== undefined) {
          addPantryToContext({
            id,
            name: nameRef.current.value,
            stats: {
              total: 0,
              fresh: 0,
              expiredSoon: 0,
              expired: 0,
            },
          });
        }
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          await refreshToken();
          //  @todo create hooks for pantries management.
        }
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
