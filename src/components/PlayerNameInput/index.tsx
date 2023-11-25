"use client"
import clsx from "clsx"
import { Button } from "../Button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Locale } from "@/data/locale"
import { LocaleMessages, getMessages } from "./translations"

type Props = {
  className?: string
  locale: Locale
}
export const PlayerNameInput: React.FC<Props> = ({ className, locale }) => {
  const [name, setName] = useState("Notch")
  const [message, setMessage] = useState<LocaleMessages[Locale]>()
  const router = useRouter()

  const goRead = () => {
    router.push(`/${locale}?playerName=${name}`)
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await getMessages(locale)
      setMessage(result)
    }

    fetchMessages()
  }, [locale])

  console.log(message)

  return (
    <div
      className={clsx(
        "bg-[#C6C6C6] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#555555] border-r-[#555555] px-6 py-6",
        className,
      )}
    >
      <p className="text-[#585858] mb-2">{message?.playerNameInput.label}</p>
      <input
        type="text"
        className="bg-[#4E4737] border-2 border-t-[#373737] border-l-[#373737] border-b-[#FFFFFF] border-r-[#FFFFFF] px-1 py-1 shadow-inner rounded-none text-[#FFFFFF] w-full mb-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={goRead}>{message?.playerNameInput.enter}</Button>
    </div>
  )
}
