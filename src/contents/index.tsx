import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

const Main = () => {
  return <div>Feedhub</div>
}

export default Main

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  all_frames: true,
  run_at: "document_start"
}
