"use client"
import { Icon } from "@iconify/react"
import clsx from "clsx"
import { FC, useEffect, useRef, useState } from "react"
import { Button } from "../Button"

type Props = {
	className?: string
}
export const BGM: FC<Props> = ({ className }) => {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return
		const bgm = localStorage.getItem("bgm")
		if (bgm === "false") return
		audio.play()
		setIsPlaying(true)
		localStorage.setItem("bgm", "true")
		return () => audio.pause()
	}, [])

	const toggle = () => {
		const audio = audioRef.current
		if (!audio) return
		if (isPlaying) {
			audio.pause()
			setIsPlaying(false)
			localStorage.setItem("bgm", "false")
		} else {
			audio.play()
			setIsPlaying(true)
			localStorage.setItem("bgm", "true")
		}
	}

	return (
		<div className={clsx(className)}>
			<audio loop ref={audioRef}>
				<source src="/music/minecraft-credits.mp3" />
			</audio>
			<Button
				className="text-3xl md:text-4xl"
				onClick={toggle}
				aria-label={isPlaying ? "Pause" : "Play"}
			>
				{isPlaying ? (
					<Icon icon="mdi:volume-high" />
				) : (
					<Icon icon="mdi:volume-off" />
				)}
			</Button>
		</div>
	)
}
