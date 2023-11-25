import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

export const Button: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={clsx(
        "bg-[#919191] border-2 border-t-[#AFADAF] border-l-[#AFADAF] border-b-[#535552] border-r-[#535552] text-[#D8D8D8] shadow-black shadow-sm w-full px-2 py-1",
        "hover:bg-[#7D83BA] hover:text-[#C6CB9B] hover:border-t-[#B2BBE7] hover:border-l-[#B2BBE7] hover:border-b-[#5D608F] hover:border-r-[#5D608F]",
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
