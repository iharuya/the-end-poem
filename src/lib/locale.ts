export const locales = ["en", "ja"] as const
export type Locale = (typeof locales)[number]
export const localeCheck = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale)
}
