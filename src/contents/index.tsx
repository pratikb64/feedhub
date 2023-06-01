import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"

const Main = () => {
  return <div></div>
}

export default Main

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  run_at: "document_start"
}
