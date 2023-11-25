import { Locale } from "@/data/locale"

export type MessagesJP = typeof import("./ja.json")
export type MessagesEN = typeof import("./en.json")
export type LocaleMessages = {
  ja: MessagesJP
  en: MessagesEN
}

export const getMessages = async <T extends Locale>(
  locale: T,
): Promise<LocaleMessages[T]> => {
  return (await import(`./${locale}.json`)).default satisfies LocaleMessages[T]
}
