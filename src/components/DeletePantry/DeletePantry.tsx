import { useToken } from '../../hooks/useToken';
import { useBearerToken } from '../../hooks/useBearerToken';
import { protectedBasicRoute } from '../../utils/fetch';
import { ShortPantry } from '../../types';
import { AxiosError } from 'axios';
import { useRefreshToken } from '../../hooks/useRefreshToken';
import { usePantries } from '../../hooks/usePantries';

interface Props {
  pantryId: string;
}

export const DeletePantry = ({ pantryId }: Props) => {
  const { deletePantry } = usePantries();
  const bearer = useBearerToken();
  const refreshToken = useRefreshToken();
  const deletePantryAPI = async () => {
    try {
      const response = await protectedBasicRoute.delete(
        `/pantry/${pantryId}`,
        bearer
      );
      deletePantry(pantryId);
    } catch (e) {
      if (e instanceof AxiosError) {
        await refreshToken();
      }
    }
  };

  return <button onClick={deletePantryAPI}>Delete</button>;
};
