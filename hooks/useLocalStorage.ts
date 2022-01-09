import { useState, useEffect, useCallback } from "react";

export const useLocalStorage = <T extends string>(key: string, defaultValue: T) => {
  const [val, setVal] = useState<T | null>(null);

  useEffect(() => {
    try {
      const savedValue = localStorage.getItem(key);
      setVal((savedValue as T) || defaultValue);
      setStoredVal((savedValue as T) || defaultValue);
    } catch {
      setVal(defaultValue);
      setStoredVal(defaultValue);
    }
  }, []);

  const setStoredVal = useCallback(
    (val: T) => {
      setVal(val);
      try {
        localStorage.setItem(key, val);
      } catch (err) {
        console.error(err);
      }
    },
    [key],
  );

  return [val, setStoredVal] as const;
};
