import Cookies from "js-cookie";
import { NextRouter, Router } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { CookieKey } from "typings";

export const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const updateLocalStorage = (key: string, value: any) => {
  try {
    const currentValue = JSON.parse(localStorage.getItem(key) as string);
    localStorage.setItem(key, JSON.stringify({ ...currentValue, ...value }));
  } catch (error) {
    console.error(error);
  }
};

function getCookieValue<T>(key: CookieKey, defaultValue: T): T {
  const cookieValue = Cookies.get(key);
  return cookieValue ? (JSON.parse(cookieValue) as T) : defaultValue;
}

function setCookieValue<T>(
  key: CookieKey,
  value: T,
  options?: Cookies.CookieAttributes
) {
  Cookies.set(key, JSON.stringify(value), options);
}

function updateCookieValue<T>(
  key: CookieKey,
  updater: (value: T) => T,
  options?: Cookies.CookieAttributes
) {
  const currentValue = getCookieValue<T>(key, undefined);
  const updatedValue = updater(currentValue);
  setCookieValue(key, updatedValue, options);
}

export { getCookieValue, setCookieValue, updateCookieValue };

export const redirectToLocation = ({
  router,
  pathname,
  query = {},
  url,
  res,
  options = {},
}: {
  router: NextRouter;
  pathname: string;
  query?: string | ParsedUrlQueryInput | null | undefined;
  url?: string;
  res?: any;
  options?: Object;
}) => {
  if (typeof window !== "undefined") {
    router.push({ pathname, query }, url, options);
  } else {
    res?.writeHead(302, {
      Location: url,
    });
    res?.end();
  }
};

export function clearAllStorage(key: string) {
  Cookies.remove(key);
  window.localStorage.clear();
}

export function numberWithCommas(num: string | number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
