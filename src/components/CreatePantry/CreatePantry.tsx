import './CreatePantry.css';
import { useToken } from '../../hooks/useToken';
import { ChangeEvent, FormEvent, useState } from 'react';
import { basicRoute, protectedBasicRoute } from '../../utils/fetch';
import { AxiosError } from 'axios';
import { CreatePantryResponse, ShortPantry } from '../../types';
import { useNavigate } from 'react-router-dom';
type SetPantries = (pantries: ShortPantry[]) => ShortPantry[];
interface Props {
  addPantry: (fn: SetPantries) => void;
}

export const CreatePantry = ({ addPantry }: Props) => {
  const [token, setToken] = useToken();
  const [name, setName] = useState('');
  const [result, setResult] = useState(false);
  const navigation = useNavigate();
  const createPantry = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${token}`,
        },
      };
      const results = await basicRoute.post('/pantry', { name }, config);

      const { pantryId: id } = results.data as CreatePantryResponse;
      if (id !== undefined) {
        addPantry((pantries) => [
          ...pantries,
          {
            stats: {
              total: 0,
              fresh: 0,
              expiredSoon: 0,
              expired: 0,
            },
            name,
            id,
          },
        ]);
      }
      setName('');
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          // setToken(null);
          console.log('expired token');
          // navigation('/login', { replace: true });
        }
      }
    }
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  return (
    <div className='CreatePantry'>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={createPantry} className='CreatePantry__form'>
        <label className='CreatePantry__label'>
          Name:
          <input
            className='CreatePantry__input'
            type='text'
            value={name}
            onChange={handleInput}
          />
        </label>
      </form>
      {result ? <p>Pantry has been created.</p> : null}
    </div>
  );
};
