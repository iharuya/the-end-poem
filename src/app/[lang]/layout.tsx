import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import styles from "./layout.module.css"
import clsx from "clsx"
import { LocaleSwitcher } from "@/components/LocaleSwitch"
import { Locale, locales } from "@/lib/locale"
import { BASE_URL } from "@/data/baseUrl"
import { getMessages } from "@/messages"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: Locale }
}): Promise<Metadata> => {
  const messages = await getMessages(lang).catch(() => notFound())

  const APP_NAME = messages.app.title
  const APP_DESCRIPTION = messages.app.description
  return {
    title: {
      default: APP_NAME,
      template: "%s | " + APP_NAME,
    },
    description: APP_DESCRIPTION,
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(BASE_URL),
    openGraph: {
      type: "website",
      title: APP_NAME,
      description: APP_DESCRIPTION,
      siteName: APP_NAME,
      url: `/`,
      images: [
        {
          url: `/images/wake-up.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: APP_NAME,
      description: APP_DESCRIPTION,
    },
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <body className={clsx(inter.className, "w-full h-full")}>
        <div className={styles.background}>
          <LocaleSwitcher
            currentLocale={params.lang}
            className="w-[160px] fixed z-10 top-4 right-2 md:top-8 md:right-8"
          />
          <div className="absolute inset-0 overflow-y-auto">{children}</div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
