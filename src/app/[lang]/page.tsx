import { PlayerNameInput } from "@/components/PlayerNameInput"
import { Locale } from "@/data/locale"
import Image from "next/image"
import MinecraftBanner from "@images/minecraft-banner.webp"
import { Poem } from "@/components/Poem"

const isValidSearchParams = (params: {
  [key: string]: string | string[] | undefined
}): params is { playerName: string } => {
  return typeof params.playerName === "string"
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
  params: { lang: Locale }
}) {
  // const message = await getMessage(params.lang)

  if (!isValidSearchParams(searchParams)) {
    return (
      <main className="h-screen flex flex-col items-center justify-center">
        <PlayerNameInput locale={params.lang} />
      </main>
    )
  }
  return (
    <main className="flex flex-col items-center text-white">
      <Image
        src={MinecraftBanner}
        alt="Minecraft"
        width={500}
        className="mx-auto"
      />
      <h1 className="text-4xl font-bold">The End Poem</h1>
      <Poem
        className="px-2 max-w-3xl mx-auto pt-24 pb-24"
        locale={params.lang}
        playerName={searchParams.playerName}
      />
      <div className="h-screen"></div>
    </main>
  )
}