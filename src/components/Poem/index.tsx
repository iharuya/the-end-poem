import clsx from "clsx"
import { Locale } from "@/lib/locale"
import { JA } from "./translations/JA"
import { EN } from "./translations/EN"

type Props = {
  locale: Locale
  playerName: string
  className?: string
}
export const Poem: React.FC<Props> = async ({
  locale,
  playerName,
  className,
}) => {
  return (
    <div
      className={clsx(
        "text-white font-semibold text-lg md:text-xl space-y-16",
        className,
      )}
    >
      {locale === "ja" ? (
        <JA playerName={playerName} />
      ) : (
        <EN playerName={playerName} />
      )}
    </div>
  )
}
