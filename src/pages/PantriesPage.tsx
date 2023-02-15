import { useToken } from '../hooks/useToken';
import { useEffect } from 'react';
import { FetchShortPantriesResponse } from '../types';
import { basicRoute } from '../utils/fetch';
import { BriefPantry } from '../components/Pantry/BriefPantry';
import { AxiosError } from 'axios';
import { CreatePantry } from '../components/CreatePantry/CreatePantry';
import { useNavigate } from 'react-router-dom';
import { useRefreshToken } from '../hooks/useRefreshToken';
import './PantriesPage.css';
import { usePantries } from '../hooks/usePantries';

export const PantriesPage = () => {
  const { pantriesInContext, addPantriesToContext } = usePantries();
  const [token] = useToken();
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
        const results = await basicRoute.get('/pantry/stats', config);

        const shortPantries = results.data as FetchShortPantriesResponse;
        addPantriesToContext(shortPantries.data);
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
    <div className='Pantries'>
      <h2 className='Pantries__title'>Pantries: </h2>
      <ul className='Pantries__list'>
        {pantriesInContext?.length ? (
          pantriesInContext.map((pantry) => {
            return (
              <li className='Pantries__item' key={pantry.id}>
                <BriefPantry
                  id={pantry.id}
                  name={pantry.name}
                  stats={pantry.stats}
                />
              </li>
            );
          })
        ) : (
          <p className='Pantries__notification'>No pantries to display.</p>
        )}
        <li className='Pantries__item'>
          <CreatePantry />
        </li>
      </ul>
    </div>
  );
};
