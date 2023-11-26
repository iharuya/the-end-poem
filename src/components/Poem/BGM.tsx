"use client"
import clsx from "clsx"
import { Icon } from "@iconify/react"
import { useEffect, useRef, useState } from "react"
import { Button } from "../Button"

type Props = {
  className?: string
}
export const BGM: React.FC<Props> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play()
    setIsPlaying(true)
    return () => audio.pause()
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className={clsx(className)}>
      <audio loop ref={audioRef}>
        <source src={`/music/minecraft-credits.mp3`} />
      </audio>
      <Button className="text-white text-3xl md:text-4xl" onClick={toggle}>
        {isPlaying ? (
          <Icon icon="mdi:volume-high" aria-label="Pause" />
        ) : (
          <Icon icon="mdi:volume-off" aria-label="Play" />
        )}
      </Button>
    </div>
  )
}
