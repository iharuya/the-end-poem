"use client"
import { useLocale } from "@/hooks/useLocale"
import { useRouter } from "next/navigation"
import React, {
	FC,
	PropsWithChildren,
	TouchEventHandler,
	useEffect,
	useRef
} from "react"

type Props = {
	speed?: number
}
export const Controller: FC<PropsWithChildren<Props>> = ({
	children,
	speed = 20
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const locale = useLocale()

	// Automatic scrolling
	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const interval = setInterval(() => {
			if (
				container.scrollHeight - container.scrollTop ===
				container.clientHeight
			) {
				clearInterval(interval)
			} else {
				container.scrollTop += 1
			}
		}, 1000 / speed)

		return () => clearInterval(interval)
	}, [speed])

	// desktop controls
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const container = containerRef.current
			if (!container) return
			if (
				event.code === "ArrowUp" ||
				event.code === "ArrowDown" ||
				event.code === "Space"
			) {
				event.preventDefault()
				const scrollAmount = event.code === "ArrowUp" ? -speed : speed
				container.scrollTop += scrollAmount / 10
			}
		}

		const handleWheel = (event: WheelEvent) => {
			const container = containerRef.current
			if (!container) return
			event.preventDefault()
			if (event.deltaY > 0) {
				container.scrollTop += speed / 10
			} else if (event.deltaY < 0) {
				container.scrollTop -= speed / 10
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		window.addEventListener("wheel", handleWheel, { passive: false })
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			window.removeEventListener("wheel", handleWheel)
		}
	}, [speed])

	// Touch controls
	const lastTouchRef = useRef<number>(0)
	const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
		const touchY = event.touches[0].clientY
		const container = containerRef.current
		if (!container) return

		const deltaY = lastTouchRef.current - touchY
		container.scrollTop += deltaY
		lastTouchRef.current = touchY
	}

	const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
		lastTouchRef.current = event.touches[0].clientY
	}

	// if esc is pressed, redirect to /
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === "Escape") {
				event.preventDefault()
				router.push(`/${locale}`)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [locale, router])

	return (
		<div
			ref={containerRef}
			onTouchMove={handleTouchMove}
			onTouchStart={handleTouchStart}
			className="overflow-y-auto max-h-screen"
		>
			{children}
		</div>
	)
}
