import { useToken } from '../hooks/useToken';
import { useEffect, useState } from 'react';
import { FetchShortPantriesResponse, ShortPantry } from '../types';
import { basicRoute, protectedBasicRoute } from '../utils/fetch';
import { BriefPantry } from '../components/Pantry/BriefPantry';
import { AxiosError } from 'axios';
import { CreatePantry } from '../components/CreatePantry/CreatePantry';
import { useNavigate, redirect } from 'react-router-dom';
import { UseRefreshToken } from '../hooks/useRefreshToken';
export const PantriesPage = () => {
  const [pantries, setPantries] = useState<ShortPantry[]>([]);
  const [token, setToken] = useToken();
  const [error, setError] = useState<null | string>(null);
  const navigation = useNavigate();
  const refreshToken = UseRefreshToken();
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
            // const token = await refreshToken();
            // console.log({ token });
            setToken(null);
            navigation('/login', { replace: true });
          }
        }
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log('fetching');
  //       const config = {
  //         headers: {
  //           // prettier-ignore
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       };
  //       const { data } = await protectedBasicRoute.get('/pantry', config);
  //       const shortPantries = (await data) as FetchShortPantriesResponse;
  //       setPantries(shortPantries.data);
  //     } catch (e: unknown) {
  //       if (e instanceof AxiosError) {
  //         setError(e.message);
  //         if (e.status === 401) {
  //           setToken(null);
  //           navigation('/login');
  //         }
  //       }
  //     }
  //   })();
  // }, [pantries]);

  if (token === null) return null;

  return (
    <div>
      <button onClick={(event) => refreshToken()}>refresh</button>
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
