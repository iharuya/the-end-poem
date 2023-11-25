import { Locale } from "@/data/locale"
import { useParams } from "next/navigation"

export const useLocale = () => {
  const params = useParams()
  return params.lang as Locale
}
