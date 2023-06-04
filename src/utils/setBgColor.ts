import type { HTMLElementEvent } from "./types"

export default function setBgColor(e: MouseEvent) {
  const event = e as HTMLElementEvent
  event.target.style.backgroundColor = "rgba(51,136,255,0.6)"
}
