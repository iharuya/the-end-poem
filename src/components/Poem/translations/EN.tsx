import { Blue } from "../Blue"
import { Green } from "../Green"

type Props = {
  playerName: string
}
export const EN: React.FC<Props> = ({ playerName }) => {
  return (
    <>
      <Blue>I see the player you mean.</Blue>
      <Green>{playerName}?</Green>
    </>
  )
}
