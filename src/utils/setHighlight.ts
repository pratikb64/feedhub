import type { HTMLElementEvent } from "./types"

export default function setHighlight(e: MouseEvent) {
  const event = e as HTMLElementEvent
  event.target.style.backgroundColor = "rgba(51,153,255,0.6)"
  event.target.style.boxShadow = "rgb(51,153,255) 0px 0px 0px 1px"
}
