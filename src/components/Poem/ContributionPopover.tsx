"use client"
import { EMAIL, GITHUB_URL } from "@/data/project"
import { FC, PropsWithChildren, useEffect, useRef } from "react"
import { Checkbox } from "../Checkbox"

export const ContributionPopover: FC<PropsWithChildren> = ({ children }) => {
	const textRef = useRef<HTMLDivElement>(null)
	const popoverRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleMouseUp = () => {
			if (!popoverRef.current) return
			const popoverDisabled = localStorage.getItem("popover-disabled")

			const selection = window.getSelection()
			const anchor = selection?.anchorNode
			// if it is inside popover, do nothing
			if (anchor && popoverRef.current.contains(anchor)) return

			const text = selection?.toString().trim() ?? null
			if (
				typeof text === "string" &&
				text.length > 0 &&
				popoverDisabled !== "true"
			) {
				popoverRef.current.showPopover()
			} else {
				popoverRef.current.hidePopover()
			}
		}

		document.addEventListener("mouseup", handleMouseUp)

		return () => {
			document.removeEventListener("mouseup", handleMouseUp)
		}
	}, [])

	return (
		<div ref={textRef}>
			{children}
			<div className="mx-auto bg-transparent" ref={popoverRef} popover="manual">
				<div className="max-w-lg mx-4 bg-[#919191] border-2 border-t-[#AFADAF] border-l-[#AFADAF] border-b-[#535552] border-r-[#535552] text-[#D8D8D8] shadow-black shadow-sm rounded-none p-4">
					<div className="text-lg text-[#D8D8D8]">
						<h2 className="text-xl font-bold">
							We Welcome Your Contributions!
						</h2>
						<p>
							If you would like to add more languages or provide better
							translations, please feel free to contribute. You can find our
							repository on &nbsp;
							<a
								href={GITHUB_URL}
								target="_blank"
								rel="noreferrer"
								className="underline"
							>
								GitHub
							</a>
							&nbsp; here and reach out to us via email at &nbsp;
							<a href={`mailto:${EMAIL}`} className="underline">
								{EMAIL}
							</a>
							.
						</p>
						<p>Thank you for your support!</p>
						<div className="flex gap-2 mt-2">
							<Checkbox
								id="contribution-popover-checkbox"
								onChange={(e) => {
									// localStorage.setItem("popover-disabled", e.target.checked ? "true" : "false");
								}}
							/>
							<label
								htmlFor="contribution-popover-checkbox"
								className="cursor-pointer font-bold select-none"
							>
								Never show this again
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
