"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { getMessages } from "./translations"
import { Locale, localeCheck, locales } from "@/lib/locale"

const FormSchema = async (locale: Locale) => {
  const { error } = await getMessages(locale)
  return z.object({
    locale: z.enum(locales),
    playerName: z
      .string({
        invalid_type_error: "Invalid type",
      })
      .trim()
      .min(1, error.tooShort)
      .max(20, error.tooLong),
  })
}

export type State = {
  errors?: {
    playerName?: string[]
    locale?: string[]
  }
}
export async function goToPoem(prevState: State, formData: FormData) {
  const locale = formData.get("locale")?.toString()
  if (!locale || !localeCheck(locale))
    return {
      errors: {
        locale: ["Invalid locale"],
      },
    }
  const validatedFields = (await FormSchema(locale)).safeParse({
    playerName: formData.get("playerName"),
    locale: formData.get("locale"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const { playerName } = validatedFields.data
  redirect(`/${locale}?playerName=${encodeURIComponent(playerName)}`)
}
