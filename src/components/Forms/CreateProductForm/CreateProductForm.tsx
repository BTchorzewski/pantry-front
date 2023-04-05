import './CreateProductForm.css';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToPantry } from '../../../redux/itemSlice/itemsSlice';
import { Button } from '@mui/material';

interface Props {
  pantryId: string;
  hideForm: () => void;
}

export const CreateProductForm = ({ pantryId, hideForm }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const expirationRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // @todo remove ts-ignores
    // @ts-ignore
    dispatch(
      // @ts-ignore
      addItemToPantry({
        // @ts-ignore
        name: nameRef?.current?.value,
        // @ts-ignore
        expiration: expirationRef?.current?.value,
        pantryId,
      })
    );
    console.log('submitted');
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
      <Button
        variant={'contained'}
        color={'primary'}
        size={'medium'}
        type={'submit'}
      >
        Create
      </Button>
    </form>
  );
};
