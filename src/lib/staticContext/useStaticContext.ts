import { useContext } from 'react';
import StaticContext from './StaticContext';

export function useStaticContext() {
  return useContext(StaticContext);
}
