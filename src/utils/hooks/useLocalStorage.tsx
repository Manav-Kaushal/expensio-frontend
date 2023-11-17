import { useState, useEffect } from "react";

type LocalStorageKey = "session" | "logout";

function useLocalStorage<T>(
  key: LocalStorageKey,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      if (typeof window !== "undefined") {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        setStoredValue(JSON.parse(event.newValue as string));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
