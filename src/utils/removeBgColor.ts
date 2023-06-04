import type { HTMLElementEvent } from "./types"

export default function removeBgColor(e: MouseEvent) {
  const event = e as HTMLElementEvent
  event.target.style.backgroundColor = ""
}
