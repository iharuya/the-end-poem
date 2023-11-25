"use client"

import { getRandomString } from "@/lib/string"
import clsx from "clsx"
import { useEffect, useState } from "react"

type Props = {
  length?: number
  className?: string
}
export const Scrambled: React.FC<Props> = ({ length = 10, className }) => {
  const [text, setText] = useState(getRandomString(length))
  useEffect(() => {
    const interval = setInterval(() => {
      setText(getRandomString(length))
    }, 75)
    return () => clearInterval(interval)
  })
  return (
    <span
      className={clsx(className, "overflow-x-hidden inline-flex")}
      style={{
        width: `${length * 10}px`,
      }}
    >
      {text}
    </span>
  )
}
