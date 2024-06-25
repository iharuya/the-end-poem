import { Locale } from "@/lib/locale"
import clsx from "clsx"
import { FC, Suspense } from "react"
import { Select } from "./Select"
import { getLocales, getMessages } from "./translations"

type Props = {
  className?: string
  currentLocale: Locale
}
export const LocaleSwitcher: FC<Props> = async ({
  className,
  currentLocale
}) => {
  const messages = await getMessages(currentLocale)
  const localeMap = await getLocales()
  return (
    <div className={clsx(className)}>
      <label className={clsx("relative")}>
        <p className="sr-only">{messages.selectLanguage}</p>
        <Suspense>
          <Select currentLocale={currentLocale} localeMap={localeMap} />
        </Suspense>
      </label>
    </div>
  )
}
