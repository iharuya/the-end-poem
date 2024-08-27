import type { Metadata } from "next"
import "../globals.css"
import { LocaleSwitcher } from "@/components/LocaleSwitch"
import { BASE_URL } from "@/data/baseUrl"
import { Locale, locales } from "@/lib/locale"
import { getMessages } from "@/messages"
import { Analytics } from "@vercel/analytics/react"
import clsx from "clsx"
import localFont from "next/font/local"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import styles from "./layout.module.css"

const minecraftFont = localFont({
	src: [
		{
			path: "../fonts/minecraft/Regular.otf",
			weight: "400",
			style: "normal"
		},
		{
			path: "../fonts/minecraft/Regular.otf",
			weight: "600",
			style: "normal"
		},
		{
			path: "../fonts/minecraft/Bold.otf",
			weight: "700",
			style: "normal"
		}
	]
})

const minecraftFontJP = localFont({
	src: [
		{
			path: "../fonts/unifont_jp-15.1.05.otf",
			weight: "400",
			style: "normal"
		}
	]
})

export async function generateStaticParams() {
	return locales.map((locale) => ({ lang: locale }))
}

export const generateMetadata = async ({
	params: { lang }
}: {
	params: { lang: Locale }
}): Promise<Metadata> => {
	const messages = await getMessages(lang).catch(() => notFound())

	const APP_NAME = messages.app.title
	const APP_DESCRIPTION = messages.app.description
	return {
		title: {
			default: APP_NAME,
			template: "%s | " + APP_NAME
		},
		description: APP_DESCRIPTION,
		formatDetection: {
			telephone: false,
			date: false,
			email: false,
			address: false
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
					height: 630
				}
			],
			locale: lang
		},
		twitter: {
			card: "summary_large_image",
			title: APP_NAME,
			description: APP_DESCRIPTION
		}
	}
}

export default function RootLayout({
	children,
	params
}: {
	children: ReactNode
	params: { lang: Locale }
}) {
	const font = params.lang === "ja" ? minecraftFontJP : minecraftFont
	return (
		<html lang={params.lang}>
			<body className={clsx(font.className, "w-full h-full")}>
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
