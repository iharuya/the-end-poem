import { AuthorCredits } from "@/components/AuthorCredits"
import { PlayerNameInput } from "@/components/PlayerNameInput"
import { Poem } from "@/components/Poem"
import { BGM } from "@/components/Poem/BGM"
import { Controller } from "@/components/Poem/Controller"
import { Locale } from "@/lib/locale"
import { getMessages } from "@/messages"
import MinecraftBanner from "@images/minecraft-banner.webp"
import Image from "next/image"

const isValidSearchParams = (params: {
	[key: string]: string | string[] | undefined
}): params is { playerName: string } => {
	return typeof params.playerName === "string"
}

export default async function Page({
	searchParams,
	params
}: {
	searchParams: { [key: string]: string | string[] | undefined }
	params: { lang: Locale }
}) {
	const messages = await getMessages(params.lang)
	if (!isValidSearchParams(searchParams)) {
		return (
			<main className="h-screen flex flex-col items-center justify-center">
				<PlayerNameInput locale={params.lang} />
			</main>
		)
	}
	return (
		<>
			<BGM className="fixed top-4 left-2 md:top-8 md:left-8" />
			<Controller>
				<main className="flex flex-col items-center text-white">
					<Image
						src={MinecraftBanner}
						alt="Minecraft"
						width={500}
						className="mx-auto"
						priority
					/>
					<Poem
						className="px-2 max-w-3xl mx-auto pt-24 pb-24"
						locale={params.lang}
						playerName={searchParams.playerName}
					/>
					<div className="h-screen flex flex-col justify-center items-center">
						<AuthorCredits message={messages.authorCreditsMessage} />
					</div>
				</main>
			</Controller>
		</>
	)
}
