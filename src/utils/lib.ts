import Cookies from "js-cookie";
import { NextRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

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

export function getCookie(key: string): string | undefined {
  return Cookies.get(key);
}

export function setCookie(
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
): void {
  Cookies.set(key, value, options);
}

export function removeCookie(
  key: string,
  options?: Cookies.CookieAttributes
): void {
  Cookies.remove(key, options);
}

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
