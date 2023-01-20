import './ProductsList.css';
import { useEffect, useState } from 'react';
import { FetchPantryByIdResponse, Item } from '../../types';
import { basicRoute } from '../../utils/fetch';
import { useRefreshToken } from '../../hooks/useRefreshToken';
import { useBearerToken } from '../../hooks/useBearerToken';
import { useToggle } from '../../hooks/useToggle';
import { countDaysLeft } from '../../utils/utils';

interface Props {
  pantryId: string;
}

export const ProductsList = ({ pantryId }: Props) => {
  const [pantryName, setPantryName] = useState<string | null>(null);
  const [products, setProducts] = useState<Item[]>([]);
  const refreshToken = useRefreshToken();
  const bearer = useBearerToken();
  const [toggle, switchToggle] = useToggle(false);

  const removeItem = (itemId: string) => {
    // @todo remove this item from the DB.

    setProducts((prevState) => {
      return prevState?.filter(({ id }) => id !== itemId);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await basicRoute.get(`/pantry/${pantryId}`, bearer);
        const {
          data: { name, items },
        } = response.data as FetchPantryByIdResponse;
        setProducts(items);
        setPantryName(name);
      } catch (e) {
        refreshToken();
      }
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
