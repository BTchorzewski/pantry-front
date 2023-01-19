import './CreateProductForm.css';
import { useRef } from 'react';
import { basicRoute } from '../../../utils/fetch';
import { useBearerToken } from '../../../hooks/useBearerToken';
interface Props {
  pantryId: string;
  hideForm: () => void;
}
export const CreateProductForm = ({ pantryId, hideForm }: Props) => {
  const bearer = useBearerToken();
  const nameRef = useRef<HTMLInputElement>(null);
  const expirationRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      nameRef?.current?.value !== null ||
      expirationRef?.current?.value !== null
    ) {
      basicRoute
        .post(
          `/pantry/${pantryId}/item`,
          {
            name: nameRef?.current?.value,
            expiration: expirationRef?.current?.value,
          },
          bearer
        )
        .then((value) => {
          hideForm();
          console.log(value.statusText);
        })
        .catch((reason) => {
          console.log(reason);
        });
    }
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
