export type Language = "ko" | "en";

export type LocalizedText = {
  ko: string;
  en: string;
};

export function copyFor<T>(language: Language, value: { ko: T; en: T }) {
  return value[language];
}

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "ko" || value === "en";
}
