import { FC, PropsWithChildren } from "react"

export const Green: FC<PropsWithChildren> = ({ children }) => {
	return (
		<p
			className="text-[#30F628]"
			style={{
				textShadow: "1px 3px 3px #122611"
			}}
		>
			{children}
		</p>
	)
}
