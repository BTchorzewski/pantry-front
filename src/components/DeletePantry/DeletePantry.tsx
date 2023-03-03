import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { removeShortPantries } from '../../redux/pantriesSlice/pantriesSlice';

interface Props {
  pantryId: string;
}

export const DeletePantry = ({ pantryId }: Props) => {
  const dispatch = useDispatch();
  const deletePantryAPI = async () => {
    try {
      // @ts-ignore
      dispatch(removeShortPantries(pantryId));
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
      }
    }
  };

  return <button onClick={deletePantryAPI}>Delete</button>;
};
