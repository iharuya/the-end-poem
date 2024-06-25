"use client"

import { usePath } from "@/hooks/usePath"
import { Locale, locales } from "@/lib/locale"
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FC } from "react"

type Props = {
	currentLocale: Locale
	localeMap: Record<Locale, string>
}
export const Select: FC<Props> = ({ currentLocale, localeMap }) => {
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
		<select
			className={clsx(
				"bg-[#919191] border-2 border-t-[#AFADAF] border-l-[#AFADAF] border-b-[#535552] border-r-[#535552] text-[#D8D8D8] shadow-black shadow-sm w-full px-2 py-1 rounded-none",
				"hocus:bg-[#7D83BA] hocus:text-[#C6CB9B] hocus:border-t-[#B2BBE7] hocus:border-l-[#B2BBE7] hocus:border-b-[#5D608F] hocus:border-r-[#5D608F]",
				"font-bold text-xl"
			)}
			defaultValue={currentLocale}
			onChange={onSelectChange}
		>
			{locales.map((locale) => (
				<option key={locale} value={locale}>
					{localeMap[locale]}
				</option>
			))}
		</select>
	)
}
