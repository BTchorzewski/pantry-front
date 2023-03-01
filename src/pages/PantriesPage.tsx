import { useAuth } from '../hooks/useAuth';
import { useEffect, useMemo } from 'react';
import { FetchShortPantriesResponse } from '../types';
import { BriefPantry } from '../components/Pantry/BriefPantry';
import { AxiosError } from 'axios';
import { CreatePantry } from '../components/CreatePantry/CreatePantry';
import { useNavigate } from 'react-router-dom';
import { useRefreshToken } from '../hooks/useRefreshToken';
import './PantriesPage.css';
import { usePantries } from '../hooks/usePantries';
import { useAxios } from '../hooks/useAxios';
export const PantriesPage = () => {
  const { pantriesInContext, addPantriesToContext } = usePantries();
  const [token] = useAuth();
  const navigation = useNavigate();

  const basicRoute = useAxios();
  useEffect(() => {
    (async () => {
      try {
        const results = await (await basicRoute).get('/pantry/stats');
        console.log({ results });
        const shortPantries = results.data as FetchShortPantriesResponse;
        addPantriesToContext(shortPantries.data);
      } catch (e: unknown) {
        console.log('pantriesSlice page', e);
        if (e instanceof AxiosError) {
          console.log('pantriesSlice page2', e);
        }
      }
    })();
  }, []);

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
