"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"

type Props = {
  speed?: number
}
export const Scroller: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  speed = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

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
  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    const touchY = event.touches[0].clientY
    const container = containerRef.current
    if (!container) return

    const deltaY = lastTouchRef.current - touchY
    container.scrollTop += deltaY
    lastTouchRef.current = touchY
  }, [])

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    lastTouchRef.current = event.touches[0].clientY
  }, [])

  return (
    <div
      ref={containerRef}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className="overflow-y-auto max-h-screen" // Adjust styling as needed
    >
      {children}
    </div>
  )
}
