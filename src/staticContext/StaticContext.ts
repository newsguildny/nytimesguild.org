import { createContext } from 'react';

export type StaticContextValue = Record<string, unknown>;

const StaticContext = createContext<StaticContextValue>({});

export default StaticContext;
