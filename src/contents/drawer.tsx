import { useMessage } from "@plasmohq/messaging/hook"
import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import { useStore } from "zustand"
import useDatabase from "~hooks/useDatabase"
import drawerState from "~states/drawerState"

const Drawer = () => {
  const { isVisible, toggle } = useStore(drawerState)
  useMessage<string, string>(async (req, res) => {
    if (req.name == "toggle-drawer") {
      toggle()
      res.send("ok")
    }
  })
  const [activeProject, setActiveProject] = useState<
    | {
        id: string
        domain: string
      }
    | undefined
  >()
  const { getDocumentList } = useDatabase()

  const getProjects = async () => {
    const projects = await getDocumentList({
      collectionId: "projects"
    })
    const projectExist = projects.documents.find(
      (project) => project.domain == window.location.hostname
    )
    if (projectExist) {
      setActiveProject({
        domain: projectExist.domain,
        id: projectExist.$id
      })
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  if (!activeProject) return <></>

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
