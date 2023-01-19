import React, { createContext, useState } from 'react';
import { ShortPantry } from '../types';

interface Props {
  children: React.ReactNode;
}

type deletePantry = (pantryId: string) => void;
type updatePantry = (pantryId: string, name: string) => void;
type addPantry = (pantry: ShortPantry) => void;
type AddPantries = (pantries: ShortPantry[]) => void;

export interface PantriesContextType {
  pantries: ShortPantry[] | null;
  addPantries: AddPantries;
  addPantry: addPantry;
  updatePantry: updatePantry;
  deletePantry: deletePantry;
}

export const PantriesContext = createContext<PantriesContextType>({
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

  return (
    <PantriesContext.Provider
      value={{ pantries, addPantries, addPantry, deletePantry, updatePantry }}
    >
      {children}
    </PantriesContext.Provider>
  );
};
