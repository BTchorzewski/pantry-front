import './CreateProductForm.css';
import { useRef } from 'react';
import { basicRoute } from '../../../utils/fetch';
import { useBearerToken } from '../../../hooks/useBearerToken';
import { useRefreshToken } from '../../../hooks/useRefreshToken';
import { usePantries } from '../../../hooks/usePantries';
interface Props {
  pantryId: string;
  hideForm: () => void;
}
export const CreateProductForm = ({ pantryId, hideForm }: Props) => {
  const bearer = useBearerToken();
  const refreshToken = useRefreshToken();
  const nameRef = useRef<HTMLInputElement>(null);
  const expirationRef = useRef<HTMLInputElement>(null);
  const { increaseStatsInPantryInContext } = usePantries();
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

          // @todo we must add this product with id to products list.
          if (expirationRef?.current?.value.length) {
            increaseStatsInPantryInContext(
              pantryId,
              new Date(expirationRef.current.value)
            );
          }

          console.log(value.statusText);
        })
        .catch((reason) => {
          console.log(reason);
          refreshToken();
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
