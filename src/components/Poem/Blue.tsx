import { FC, PropsWithChildren } from "react"

export const Blue: FC<PropsWithChildren> = ({ children }) => {
	return (
		<p
			className="text-[#54FCF2]"
			style={{
				textShadow: "1px 3px 3px #0e2927"
			}}
		>
			{children}
		</p>
	)
}
