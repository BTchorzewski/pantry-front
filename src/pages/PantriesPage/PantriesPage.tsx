import { useEffect } from 'react';
import { BriefPantry } from '../../components/Pantry/BriefPantry';
import { CreatePantry } from '../../components/CreatePantry/CreatePantry';
import './PantriesPage.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchShortPantries,
  pantriesSelector,
} from '../../redux/pantriesSlice/pantriesSlice';
import { Item } from '../../types';
export const PantriesPage = () => {
  const dispatch = useDispatch();
  const shortPantriesState = useSelector(pantriesSelector);
  // @ts-ignore
  const products: Item[] = useSelector((state) => state?.items?.items);
  useEffect(() => {
    (async () => {
      // @ts-ignore
      dispatch(fetchShortPantries());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      dispatch(fetchShortPantries());
    })();
  }, [products]);

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
