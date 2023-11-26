import { Locale } from "@/lib/locale"
import { Form } from "./Form"
import { getMessages } from "./translations"

type Props = {
  className?: string
  locale: Locale
}
export const PlayerNameInput: React.FC<Props> = async ({
  className,
  locale,
}) => {
  const messages = await getMessages(locale)
  return <Form className={className} locale={locale} messages={messages} />
}
