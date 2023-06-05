import commentPopupState from "~states/commentPopupState"
import getXPath from "./getXPath"
import type { HTMLElementEvent } from "./types"

export default function addComment(e: MouseEvent) {
  e.preventDefault()
  e.stopImmediatePropagation()
  const event = e as HTMLElementEvent
  const xPath = getXPath(event.target)
  let x = event.clientX + window.scrollX - 16
  let y = event.clientY + window.scrollY - 16
  commentPopupState.setState({
    positionX: x,
    positionY: y,
    xPath,
    isVisible: true
  })
}
