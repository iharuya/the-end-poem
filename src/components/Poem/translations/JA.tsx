import { Blue } from "../Blue"
import { Green } from "../Green"

type Props = {
  playerName: string
}
export const JA: React.FC<Props> = ({ playerName }) => {
  return (
    <>
      <Blue>これがキミの言っていたプレイヤーか。</Blue>
      <Green>{playerName}？</Green>
    </>
  )
}
