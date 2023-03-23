import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { modifyItemInPantry } from '../../../redux/itemSlice/itemsSlice';

interface Props {
  name: string;
  expiration: Date;
  itemId: string;
}

export const UpdateItemForm = ({ expiration, name, itemId }: Props) => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const expirationRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      // @ts-ignore
      modifyItemInPantry({
        id: itemId,
        // @ts-ignore
        name: nameRef?.current?.value,
        // @ts-ignore
        expiration: expirationRef?.current?.value,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor=''>
        new name:
        <input type='text' ref={nameRef} />
      </label>
      <label htmlFor=''>
        new expiration date:
        <input type='date' ref={expirationRef} />
      </label>
      <button type={'submit'}>update</button>
    </form>
  );
};
