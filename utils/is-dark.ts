export function getIsDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const isDark = getIsDark();
