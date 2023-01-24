import React, { createContext, useState } from 'react';
import { ShortPantry } from '../types';
import { countDaysLeft } from '../utils/utils';

interface Props {
  children: React.ReactNode;
}

type ExpirationStatus = 'fresh' | 'expiredSoon' | 'expired';
type AddPantryToContext = (pantry: ShortPantry) => void;
type UpdatePantryInContext = (pantryId: string, name: string) => void;
type DeletePantryFromContext = (pantryId: string) => void;
type AddPantriesToContext = (pantries: ShortPantry[]) => void;
type IncreaseStatsInPantryInContext = (
  pantryId: string,
  expiration: Date
) => void;
type DecreaseStatsInPantryInContext = (
  pantryId: string,
  expirationStatus: Date
) => void;
export interface PantriesContextType {
  pantriesInContext: ShortPantry[] | null;
  addPantriesToContext: AddPantriesToContext;
  addPantryToContext: AddPantryToContext;
  updatePantryInContext: UpdatePantryInContext;
  deletePantryFromContext: DeletePantryFromContext;
  increaseStatsInPantryInContext: IncreaseStatsInPantryInContext;
  decreaseStatsInPantryInContext: DecreaseStatsInPantryInContext;
}

export const PantriesContext = createContext<PantriesContextType>({
  pantriesInContext: null,
  addPantriesToContext(pantries: ShortPantry[]): void {},
  addPantryToContext(pantry: ShortPantry): void {},
  updatePantryInContext(pantryId: string, name: string): void {},
  deletePantryFromContext(pantryId: string): void {},
  increaseStatsInPantryInContext(pantryId: string, expiration: Date): void {},
  decreaseStatsInPantryInContext(
    pantryId: string,
    expirationStatus: Date
  ): void {},
});

export const PantriesProvider = ({ children }: Props) => {
  const [pantriesInContext, setPantriesInContext] = useState<ShortPantry[]>([]);

  const addPantryToContext: AddPantryToContext = (pantry) => {
    setPantriesInContext((pantries) => {
      return [...pantries, pantry];
    });
  };

  const addPantriesToContext: AddPantriesToContext = (pantries) => {
    setPantriesInContext(pantries);
  };
  const deletePantryFromContext: DeletePantryFromContext = (pantryId) => {
    setPantriesInContext((pantries) => {
      return pantries.filter((pantry) => {
        return pantry.id !== pantryId;
      });
    });
  };

  const updatePantryInContext: UpdatePantryInContext = (pantryId, name) => {
    setPantriesInContext((pantries) => {
      return pantries.map((pantry) => {
        if (pantry.id === pantryId) {
          pantry.name = name;
          return pantry;
        }
        return pantry;
      });
    });
  };

  const increaseStatsInPantryInContext: IncreaseStatsInPantryInContext = (
    pantryId,
    expiration
  ) => {
    setPantriesInContext((pantries) => {
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

  const decreaseStatsInPantryInContext: DecreaseStatsInPantryInContext = (
    pantryId,
    expiration
  ) => {
    setPantriesInContext((prevPantries) => {
      return prevPantries.map((pantry) => {
        if (pantry.id === pantryId) {
          pantry.stats.total -= 1;
          if (countDaysLeft(new Date(), expiration) > 7) {
            pantry.stats.fresh -= 1;
          } else {
            pantry.stats.expiredSoon -= 1;
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
        pantriesInContext,
        addPantriesToContext,
        addPantryToContext,
        updatePantryInContext,
        deletePantryFromContext,
        increaseStatsInPantryInContext,
        decreaseStatsInPantryInContext,
      }}
    >
      {children}
    </PantriesContext.Provider>
  );
};
