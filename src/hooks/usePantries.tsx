import { useContext } from 'react';
import {
  PantriesContext,
  PantriesContextType,
} from '../context/PantriesProvider';

export const usePantries = (): PantriesContextType => {
  return useContext(PantriesContext);
};
