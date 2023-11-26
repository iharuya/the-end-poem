import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

export const Button: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-[#919191] border-2 border-t-[#AFADAF] border-l-[#AFADAF] border-b-[#535552] border-r-[#535552] text-[#D8D8D8] shadow-black shadow-sm w-full px-2 py-1 rounded-none",
        "hocus:bg-[#7D83BA] hocus:text-[#C6CB9B] hocus:border-t-[#B2BBE7] hocus:border-l-[#B2BBE7] hocus:border-b-[#5D608F] hocus:border-r-[#5D608F]",
        className,
      )}
      {...props}
      style={{
        textShadow: "1px 1px 1px #232323",
      }}
    >
      {children}
    </button>
  )
}
