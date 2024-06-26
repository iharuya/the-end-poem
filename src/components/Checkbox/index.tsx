import clsx from "clsx"
import { FC, InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement>

export const Checkbox: FC<Props> = ({ className, ...props }) => {
	return (
		<input
			type="checkbox"
			className={clsx(
				`
        appearance-none bg-[#919191] border-2 border-t-[#AFADAF] border-l-[#AFADAF] border-b-[#535552] border-r-[#535552]
      shadow-black shadow-sm rounded-none w-6 h-6
      hocus:bg-[#7D83BA] hocus:text-[#C6CB9B] hocus:border-t-[#B2BBE7] hocus:border-l-[#B2BBE7] hocus:border-b-[#5D608F] hocus:border-r-[#5D608F]
      checked:bg-[#7D83BA] checked:border-t-[#B2BBE7] checked:border-l-[#B2BBE7] checked:border-b-[#5D608F] checked:border-r-[#5D608F]
        relative
        before:invisible after:invisible
        checked:before:visible checked:after:visible
        before:absolute before:bg-[#D8D8D8] before:top-[8px] before:left-[3px] before:w-[4px] before:h-[8px] before:rotate-[-50deg]
        after:absolute after:bg-[#D8D8D8] after:top-[2px] after:left-[10px] after:w-[4px] after:h-[16px] after:rotate-[40deg]
       `,
				className
			)}
			{...props}
		/>
	)
}
