import './ProductsList.css';
import { useEffect, useState } from 'react';
import { Item } from '../../types';
import { useToggle } from '../../hooks/useToggle';
import { countDaysLeft } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchItemsFromPantryById,
  removeItemFromPantry,
} from '../../redux/itemSlice/itemsSlice';

interface Props {
  pantryId: string;
}

export const ProductsList = ({ pantryId }: Props) => {
  const [pantryName] = useState<string | null>(null);
  const [toggle, switchToggle] = useToggle(false);
  const dispatch = useDispatch();
  const removeItem = async (itemId: string) => {
    // @ts-ignore
    await dispatch(removeItemFromPantry(itemId));
  };
  // @TODO need to type this selector.
  // @ts-ignore
  const products: Item[] = useSelector((state) => state?.items?.items);
  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        dispatch(fetchItemsFromPantryById(pantryId));
      } catch (e) {}
    })();
  }, [toggle]);

  return (
    <>
      <button
        onClick={(event) => {
          switchToggle();
        }}
      >
        Show list
      </button>
      {toggle ? (
        <div className='ProductsList'>
          <h2 className='ProductsList__title'>{pantryName}</h2>
          {products?.length ? (
            <ul className='ProductsList__list'>
              {products.map(({ id, name, expiration, createdAt }) => {
                return (
                  <li key={id} className='ProductsList__item'>
                    <div className='ProductsList__text'>name: {name}</div>
                    <div>
                      {countDaysLeft(new Date(createdAt), new Date(expiration))}
                      days left.
                    </div>
                    <p>{id}</p>
                    <button
                      onClick={(event) => {
                        removeItem(id);
                      }}
                    >
                      remove
                    </button>
                    <button
                      onClick={(event) => {
                        removeItem(id);
                      }}
                    >
                      modify
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Empty list</p>
          )}
          <button
            onClick={(event) => {
              switchToggle();
            }}
          >
            Close window
          </button>
        </div>
      ) : null}
    </>
  );
};
