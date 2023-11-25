import { usePathname } from "next/navigation"
import { useLocale } from "./useLocale"

export const usePath = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const path = pathname.replace(`/${locale}`, "/")
  return path
}
