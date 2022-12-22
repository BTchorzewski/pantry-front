import { useToken } from '../hooks/useToken';
import { useEffect, useState } from 'react';
import { FetchShortPantriesResponse, ShortPantry } from '../types';
import { protectedBasicRoute } from '../utils/fetch';
import { BriefPantry } from '../components/Pantry/BriefPantry';

export const PantriesPage = () => {
  const [token] = useToken();
  const [pantries, setPantries] = useState<ShortPantry[]>([]);
  const [error, setError] = useState<null | string>(null);
  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          // prettier-ignore
          'Authorization': `Bearer ${token}`,
        },
      };
      const { data } = await protectedBasicRoute.get('/pantry', config);
      const shortPantries = data as FetchShortPantriesResponse;
      setPantries(shortPantries.data);
    })();
  }, []);

  return (
    <div>
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
