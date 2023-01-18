import { useToken } from '../hooks/useToken';
import { useEffect, useState } from 'react';
import { FetchShortPantriesResponse, ShortPantry } from '../types';
import { basicRoute, protectedBasicRoute } from '../utils/fetch';
import { BriefPantry } from '../components/Pantry/BriefPantry';
import { AxiosError } from 'axios';
import { CreatePantry } from '../components/CreatePantry/CreatePantry';
import { useNavigate, redirect } from 'react-router-dom';
import { useRefreshToken } from '../hooks/useRefreshToken';
export const PantriesPage = () => {
  const [pantries, setPantries] = useState<ShortPantry[]>([]);
  const [token, setToken] = useToken();
  const [error, setError] = useState<null | string>(null);
  const navigation = useNavigate();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    (async () => {
      try {
        const config = {
          headers: {
            // prettier-ignore
            'Authorization': `Bearer ${token}`,
          },
        };
        const results = await basicRoute.get('/pantry', config);

        const shortPantries = results.data as FetchShortPantriesResponse;
        setPantries(shortPantries.data);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            await refreshToken();
            navigation('/login', { replace: true });
          }
        }
      }
    })();
  }, []);

  if (token === null) return null;

  return (
    <div>
      <h2>Pantries: </h2>
      <ul>
        {pantries?.length ? (
          pantries.map((pantry) => {
            return (
              <li key={pantry.id}>
                <BriefPantry
                  id={pantry.id}
                  name={pantry.name}
                  stats={pantry.stats}
                />
              </li>
            );
          })
        ) : (
          <p>No pantries to display.</p>
        )}
      </ul>
      <CreatePantry addPantry={setPantries} />
    </div>
  );
};
