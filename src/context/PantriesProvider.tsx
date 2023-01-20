import React, { createContext, useState } from 'react';
import { ShortPantry } from '../types';
import { countDaysLeft } from '../utils/utils';

interface Props {
  children: React.ReactNode;
}

type deletePantry = (pantryId: string) => void;
type updatePantry = (pantryId: string, name: string) => void;
type addPantry = (pantry: ShortPantry) => void;
type AddPantries = (pantries: ShortPantry[]) => void;
type AddProduct = (pantryId: string, expiration: Date) => void;

export interface PantriesContextType {
  pantries: ShortPantry[] | null;
  addPantries: AddPantries;
  addPantry: addPantry;
  updatePantry: updatePantry;
  deletePantry: deletePantry;
  addProduct: AddProduct;
}

export const PantriesContext = createContext<PantriesContextType>({
  addProduct(pantryId: string, expiration: Date): void {},
  pantries: null,
  addPantry(pantry: ShortPantry): void {},
  deletePantry(pantryId: string): void {},
  updatePantry(pantryId: string, name: string): void {},
  addPantries(pantries: ShortPantry[]): void {},
});

export const PantriesProvider = ({ children }: Props) => {
  const [pantries, setPantries] = useState<ShortPantry[]>([]);

  const addPantry: addPantry = (pantry) => {
    setPantries((pantries) => {
      return [...pantries, pantry];
    });
  };

  const addPantries: AddPantries = (pantries) => {
    setPantries(pantries);
  };
  const deletePantry: deletePantry = (pantryId) => {
    setPantries((pantries) => {
      return pantries.filter((pantry) => {
        return pantry.id !== pantryId;
      });
    });
  };

  const updatePantry: updatePantry = (pantryId, name) => {
    setPantries((pantries) => {
      return pantries.map((pantry) => {
        if (pantry.id === pantryId) {
          pantry.name = name;
          return pantry;
        }
        return pantry;
      });
    });
  };

  const addProduct: AddProduct = (pantryId, expiration) => {
    console.log(countDaysLeft(new Date(), expiration));
    setPantries((pantries) => {
      return pantries.map((pantry) => {
        if (pantry.id === pantryId) {
          pantry.stats.total += 1;
          if (countDaysLeft(new Date(), expiration) > 7) {
            pantry.stats.fresh += 1;
          } else {
            pantry.stats.expiredSoon += 1;
          }

          return pantry;
        }
        return pantry;
      });
    });
  };

  return (
    <PantriesContext.Provider
      value={{
        pantries,
        addPantries,
        addPantry,
        deletePantry,
        updatePantry,
        addProduct,
      }}
    >
      {children}
    </PantriesContext.Provider>
  );
};
