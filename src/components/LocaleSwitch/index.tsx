"use client"

import { Locale, locales } from "@/data/locale"
import { usePath } from "@/hooks/usePath"
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"

type Props = {
  className?: string
  currentLocale: Locale
}
export const LocaleSwitcher: React.FC<Props> = ({
  className,
  currentLocale,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const path = usePath()

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Locale
    const query = searchParams.toString() ? `?${searchParams.toString()}` : ""
    const newUrl = `/${newLocale}${path}${query}`
    router.push(newUrl)
  }

  return (
    <div className={clsx(className)}>
      <label className={clsx("relative")}>
        <p className="sr-only">言語を変更</p>
        <select
          className="bg-[#787D7D] border-2 border-t-[#AFADAF] border-l-[#AFADAF] border-b-[#535552] border-r-[#535552] w-full px-2 py-1 text-[#D8D8D8] shadow-black shadow-sm rounded-none font-bold text-xl"
          defaultValue={currentLocale}
          onChange={onSelectChange}
        >
          {locales.map((locale) => (
            <option key={locale} value={locale}>
              {locale}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
