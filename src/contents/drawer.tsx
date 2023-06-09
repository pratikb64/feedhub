import { useMessage } from "@plasmohq/messaging/hook"
import type { Models } from "appwrite"
import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"
import { AiOutlineComment } from "react-icons/ai"
import { BiCommentAdd, BiCommentX } from "react-icons/bi"
import { RiCloseFill } from "react-icons/ri"
import { useStore } from "zustand"
import Comment from "~components/Comment"
import useAccount from "~hooks/useAccount"
import useComments from "~hooks/useComments"
import useDatabase from "~hooks/useDatabase"
import commentPopupState from "~states/commentPopupState"
import commentsState from "~states/commentsState"
import drawerState from "~states/drawerState"
import projectState from "~states/projectState"
import toggleAddComment from "~utils/toggleAddComment"
import type { Project } from "~utils/types"

const Drawer = () => {
  const { isVisible, toggleIsDrawerVisible } = useStore(drawerState)
  const { activeProject, setActiveProject, setIsProductFetching } =
    useStore(projectState)
  // This is how plasmo extension offers message passing, some better way can be coded to listen particular event source I guess?
  useMessage<string, string>(async (req, res) => {
    if (req.name == "toggle-drawer") toggleIsDrawerVisible()

    if (req.name == "activate-project")
      if (req.body && req.body.trim() != "") activateProjectById(req.body)

    if (req.name == "deactivate-project") setActiveProject(undefined)
  })
  const { getDocumentList } = useDatabase()
  const { addCommentActivated } = useStore(commentPopupState)
  const { comments } = useStore(commentsState)
  const { syncComments } = useComments()
  const { fetchUser } = useAccount()

  const activateProjectById = async (id: string) => {
    const projects = await getDocumentList({
      collectionId: "projects"
    })
    const projectExist = projects.documents.find(
      (project) => project.$id == id
    ) as Models.Document & Project
    if (projectExist) {
      setActiveProject(projectExist)
      setIsProductFetching(false)
    }
  }

  useEffect(() => {
    if (isVisible) {
      syncComments()
      fetchUser()
    }
  }, [isVisible])

  const closeProject = () => {
    setActiveProject(undefined)
  }

  if (!activeProject) return <></>
  return (
    <div>
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-screen -translate-x-full transform overflow-auto bg-slate-900 font-poppins text-gray-50 transition-transform duration-300 ease-in-out sm:w-[380px] ${
          isVisible ? "translate-x-0" : ""
        }`}>
        <div className="flex items-center justify-between bg-slate-800 p-4">
          <div className="flex items-center gap-2 font-bold">
            <img
              src={"https://icon.horse/icon/" + activeProject.domain}
              alt="favicon"
              className="w-6"
            />
            {activeProject.domain}
          </div>
          <button onClick={toggleIsDrawerVisible} title="Close Side Drawer">
            <RiCloseFill size={26} />
          </button>
        </div>
        <div className="m-4 flex flex-col gap-4">
          {comments?.documents.map((comment) => (
            <Comment key={comment.$id} data={comment} />
          ))}
        </div>
      </div>
      <div>
        <div
          className="fixed bottom-8 left-8 flex flex-col gap-4"
          hidden={isVisible}>
          <button
            onClick={toggleAddComment}
            className={`flex items-center justify-center rounded-full p-2.5 text-gray-50 shadow-md ${
              addCommentActivated
                ? "bg-red-500 hover:bg-red-700 active:bg-red-800"
                : "bg-violet-600 hover:bg-violet-700 active:bg-violet-800"
            }`}
            title={addCommentActivated ? "Cancel comment" : "Add comment"}>
            {addCommentActivated ? (
              <BiCommentX size={26} />
            ) : (
              <BiCommentAdd size={26} />
            )}
          </button>
          <button
            onClick={toggleIsDrawerVisible}
            className="rounded-full bg-white p-2 shadow-md hover:bg-gray-200 active:bg-gray-300"
            title="View All Comments">
            <AiOutlineComment size={30} className="text-violet-500" />
          </button>
          <button
            onClick={closeProject}
            className="rounded-full bg-white p-2 shadow-md hover:bg-gray-200 active:bg-gray-300"
            title="Close Project">
            <RiCloseFill size={30} className="text-red-500" />
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
