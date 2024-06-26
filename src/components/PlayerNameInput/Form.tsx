"use client"
import { Locale } from "@/lib/locale"
import clsx from "clsx"
import { FC, useActionState } from "react"
import { Button } from "../Button"
import { State, goToPoem } from "./actions"

type Props = {
	className?: string
	locale: Locale
	messages: {
		label: string
		enter: string
	}
}
export const Form: FC<Props> = ({ className, locale, messages }) => {
	const initState: State = { errors: {} }
	const [state, dispatch] = useActionState(goToPoem, initState)

	return (
		<form
			action={dispatch}
			className={clsx(
				"bg-[#C6C6C6] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#555555] border-r-[#555555] px-6 py-6 w-full max-w-sm",
				className
			)}
		>
			<input type="hidden" name="locale" value={locale} />
			<p className="text-[#585858] mb-2">{messages.label}</p>
			<input
				type="text"
				name="playerName"
				placeholder="Notch"
				className="bg-[#4E4737] border-2 border-t-[#373737] border-l-[#373737] border-b-[#FFFFFF] border-r-[#FFFFFF] px-1 py-1 shadow-inner rounded-none text-[#FFFFFF] w-full"
				aria-describedby="player-name-error"
			/>
			{state.errors?.playerName && (
				<div
					id="player-name-error"
					aria-live="polite"
					className="mt-1 mb-2 text-sm text-red-500"
				>
					{state.errors.playerName.map((error) => (
						<p key={error}>{error}</p>
					))}
				</div>
			)}
			<Button type="submit" className="mt-2">
				{messages.enter}
			</Button>
		</form>
	)
}
