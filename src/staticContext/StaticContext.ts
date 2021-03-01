import { createContext } from 'react';

const StaticContext = createContext<Record<string, unknown>>({});

export default StaticContext;
