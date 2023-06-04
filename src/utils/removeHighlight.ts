import type { HTMLElementEvent } from "./types"

export default function removeHighlight(e: MouseEvent) {
  const event = e as HTMLElementEvent
  event.target.style.backgroundColor = ""
  event.target.style.border = ""
}
