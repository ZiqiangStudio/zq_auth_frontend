/// <reference types="vite-svg-loader" />

export type ResBody<T> = {
  code: string;
  detail: string;
  msg: string;
  data: T;
};
