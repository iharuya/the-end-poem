import { Locale } from "@/lib/locale"
import clsx from "clsx"
import { FC } from "react"
import { EN } from "./translations/EN"
import { JA } from "./translations/JA"

type Props = {
	locale: Locale
	playerName: string
	className?: string
}
export const Poem: FC<Props> = async ({ locale, playerName, className }) => {
	return (
		<div
			className={clsx(
				"text-white font-semibold text-lg md:text-xl space-y-16",
				className
			)}
		>
			{locale === "ja" ? (
				<JA playerName={playerName} />
			) : (
				<EN playerName={playerName} />
			)}
		</div>
	)
}
