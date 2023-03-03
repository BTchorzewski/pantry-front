import './CreateProductForm.css';
import { useRef } from 'react';
import { basicRoute } from '../../../utils/fetch';

interface Props {
  pantryId: string;
  hideForm: () => void;
}

export const CreateProductForm = ({ pantryId, hideForm }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const expirationRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='CreateProductForm'>
      <label>
        name:
        <input type='text' ref={nameRef} />
      </label>
      <label>
        expiration:
        <input type='date' ref={expirationRef} />
      </label>
      <button type={'submit'}>Add product to the pantry.</button>
    </form>
  );
};
