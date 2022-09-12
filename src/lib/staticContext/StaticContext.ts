import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class StaticContextKey<ContextType> {
  constructor(public key: string) {}
}

export const StaticContext = createContext<Record<string, unknown>>({});

export function useStaticContext<ContextType>(key: StaticContextKey<ContextType>) {
  const context = useContext(StaticContext);
  return context[key.key] as ContextType;
}
