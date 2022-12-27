import './CreatePantry.css';
import { useToken } from '../../hooks/useToken';
import { ChangeEvent, FormEvent, useState } from 'react';
import { protectedBasicRoute } from '../../utils/fetch';
import { AxiosError } from 'axios';
export const CreatePantry = () => {
  const [token] = useToken();
  const [name, setName] = useState('');
  const [result, setResult] = useState(false);
  const createPantry = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${token}`,
        },
      };
      const results = await protectedBasicRoute.post(
        '/pantry',
        { name },
        config
      );

      console.log(await results.data);
      setName('');
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
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
