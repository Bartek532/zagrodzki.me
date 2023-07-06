import { createContext, useContext } from "react";

export const createSafeContext = <T>() => {
  const context = createContext<T | undefined>(undefined);

  const useSafeContext = () => {
    const ctx = useContext(context);

    if (ctx === undefined) {
      throw new Error("useContext must be use inside Provider!");
    }

    return ctx;
  };

  return [useSafeContext, context.Provider] as const;
};
