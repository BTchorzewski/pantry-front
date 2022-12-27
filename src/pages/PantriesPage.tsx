import { useToken } from '../hooks/useToken';
import { useEffect, useState } from 'react';
import { FetchShortPantriesResponse, ShortPantry } from '../types';
import { protectedBasicRoute } from '../utils/fetch';
import { BriefPantry } from '../components/Pantry/BriefPantry';
import { AxiosError } from 'axios';

export const PantriesPage = () => {
  const [pantries, setPantries] = useState<ShortPantry[]>([]);
  const [token] = useToken();
  const [error, setError] = useState<null | string>(null);
  console.log('pantries page');
  useEffect(() => {
    console.log({ token });
    (async () => {
      try {
        const config = {
          headers: {
            // prettier-ignore
            'Authorization': `Bearer ${token}`,
          },
        };
        const { data } = await protectedBasicRoute.get('/pantry', config);
        const shortPantries = (await data) as FetchShortPantriesResponse;
        setPantries(shortPantries.data);
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          setError(e.message);
        }
      }
    })();
  }, []);

  return (
    <div>
      <div>{error !== null ? <p>{error}</p> : null}</div>
      <h2>Pantries: </h2>
      <ul>
        {pantries.map((pantry) => {
          return (
            <li key={pantry.id}>
              <BriefPantry
                id={pantry.id}
                name={pantry.name}
                stats={pantry.stats}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
