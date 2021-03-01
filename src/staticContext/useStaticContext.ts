import { useContext } from 'react';
import StaticContext from './StaticContext';

export function useStaticContext<StaticContextType>(staticContextKey: string) {
  const context = useContext(StaticContext);
  return context[staticContextKey] as StaticContextType | undefined;
}
