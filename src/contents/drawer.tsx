import { useMessage } from "@plasmohq/messaging/hook"
import type { Models } from "appwrite"
import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import { RiChatCheckFill, RiCloseFill } from "react-icons/ri"
import { useStore } from "zustand"
import Comment from "~components/Comment"
import useDatabase from "~hooks/useDatabase"
import drawerState from "~states/drawerState"

const Drawer = () => {
  const { isVisible, toggle } = useStore(drawerState)
  const [projects, setProjects] =
    useState<Models.DocumentList<Models.Document>>()
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

  const activateProject = (projects: Models.DocumentList<Models.Document>) => {
    const projectExist = projects?.documents.find(
      (project) => project.domain == window.location.hostname
    )
    if (projectExist) {
      setActiveProject({
        domain: projectExist.domain,
        id: projectExist.$id
      })
    }
  }

  const getProjects = async () => {
    const projects = await getDocumentList({
      collectionId: "projects"
    })
    setProjects(projects)
    activateProject(projects)
  }

  useEffect(() => {
    getProjects()
  }, [])

  const closeProject = () => {
    setActiveProject(undefined)
  }

  if (!activeProject) return <></>

  return (
    <div>
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-screen -translate-x-full transform bg-slate-900 font-poppins text-gray-50 transition-transform duration-300 ease-in-out sm:w-[380px] ${
          isVisible ? "translate-x-0" : ""
        }`}>
        <div className="flex items-center justify-between bg-slate-800 p-4">
          <div className="font-bold">Project name</div>
          <button onClick={toggle}>
            <RiCloseFill size={26} />
          </button>
        </div>
        <div className="m-4">
          <Comment />
        </div>
      </div>
      <div>
        <div
          className="fixed bottom-8 left-8 flex flex-col gap-4"
          hidden={isVisible}>
          <button
            onClick={toggle}
            className="rounded-full bg-gray-50 p-2 shadow-md">
            <RiChatCheckFill size={30} className="text-violet-500" />
          </button>
          <button
            onClick={closeProject}
            className="rounded-full bg-gray-50 p-2 shadow-md">
            <RiCloseFill size={30} className="text-violet-500" />
          </button>
        </div>
      </div>
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
