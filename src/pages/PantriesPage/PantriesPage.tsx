import { useEffect, useMemo } from 'react';
import { BriefPantry } from '../../components/Pantry/BriefPantry';
import { CreatePantry } from '../../components/CreatePantry/CreatePantry';
import { useNavigate } from 'react-router-dom';
import './PantriesPage.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchShortPantries,
  pantriesSelector,
} from '../../redux/pantriesSlice/pantriesSlice';
export const PantriesPage = () => {
  const dispatch = useDispatch();
  const shortPantriesState = useSelector(pantriesSelector);
  useEffect(() => {
    (async () => {
      // @ts-ignore
      dispatch(fetchShortPantries());
    })();
  }, [dispatch]);

  // @ts-ignore
  if (shortPantriesState.pantries.status === 'loading')
    return <p>loading...</p>;

  return (
    <div className='Pantries'>
      <h2 className='Pantries__title'>Pantries: </h2>
      <ul className='Pantries__list'>
        {shortPantriesState?.pantries?.length > 0 ? (
          shortPantriesState.pantries.map((pantry) => {
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
