import { useMessage } from "@plasmohq/messaging/hook"
import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useStore } from "zustand"
import drawerState from "~states/drawerState"

const Drawer = () => {
  const { isVisible, toggle } = useStore(drawerState)
  useMessage<string, string>(async (req, res) => {
    if (req.name == "toggle-drawer") {
      toggle()
      res.send("ok")
    }
  })

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-screen -translate-x-full transform bg-slate-900 transition-transform duration-300 ease-in-out sm:w-[360px] ${
        isVisible ? "translate-x-0" : ""
      }`}>
      Drawer
      <button onClick={toggle}>off</button>
    </div>
  )
}

export default Drawer

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  run_at: "document_idle"
}
