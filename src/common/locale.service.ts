const LOCALE_KEY = 'lm:locale';

export const getLocale = (): string | null => {
  return window.localStorage.getItem(LOCALE_KEY);
};

export const toggleLocale = (): void => {
  window.localStorage.setItem(LOCALE_KEY, getLocale() === 'en' ? 'de' : 'en');
};
