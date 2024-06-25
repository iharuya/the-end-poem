import clsx from "clsx"
import Link from "next/link"
import { FC } from "react"

type Props = { className?: string; message: string }
export const AuthorCredits: FC<Props> = ({ className, message }) => {
	return (
		<div className={clsx(className)}>
			<p className="text-white font-bold text-xl text-center">
				{message.split("[author]").map((text, i, arr) => {
					return i === arr.length - 1 ? (
						<span key={i}>{text}</span>
					) : (
						<span key={i}>
							{text}
							<Link
								href="https://x.com/juliangough"
								target="_blank"
								className="underline hover:opacity-70"
							>
								Julian Gough
							</Link>
						</span>
					)
				})}
			</p>
		</div>
	)
}
