const LOCALE_KEY: string = 'lm:locale';

export const toggleLocale = (): void => {
	window.localStorage.setItem(LOCALE_KEY, getLocale() === 'en' ? 'de' : 'en');
};

export const getLocale = (): string | null => {
	return window.localStorage.getItem(LOCALE_KEY);
};
