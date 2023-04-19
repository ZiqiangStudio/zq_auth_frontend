export function getIsDark() {
  if (process.client) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export const isDark = getIsDark();
