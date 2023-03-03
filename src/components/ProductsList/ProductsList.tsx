import './ProductsList.css';
import { useEffect, useState } from 'react';
import { Item } from '../../types';
import { useToggle } from '../../hooks/useToggle';
import { countDaysLeft } from '../../utils/utils';

interface Props {
  pantryId: string;
}

export const ProductsList = ({ pantryId }: Props) => {
  const [pantryName] = useState<string | null>(null);
  const [products] = useState<Item[]>([]);
  const [toggle, switchToggle] = useToggle(false);
  const removeItem = (itemId: string) => {};

  useEffect(() => {
    (async () => {
      try {
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
                      {countDaysLeft(new Date(createdAt), new Date(expiration))}{' '}
                      days left.
                    </div>
                    <button
                      onClick={(event) => {
                        removeItem(id);
                      }}
                    >
                      remove
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
