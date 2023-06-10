import { sendToContentScript } from "@plasmohq/messaging"
import { useEffect, useState } from "react"
import { RiAddFill } from "react-icons/ri"
import { TbExternalLink } from "react-icons/tb"
import { useStore } from "zustand"
import Comment from "~components/Comment"
import LoadingScreen from "~components/LoadingScreen"
import ProjectLayout from "~components/ProjectLayout"
import ProjectSettings from "~components/ProjectSettings"
import useComments from "~hooks/useComments"
import useCurrentTab from "~hooks/useCurrentTab"
import commentsState from "~states/commentsState"
import projectState from "~states/projectState"

const Project = () => {
  const { syncComments } = useComments()
  const { comments } = useStore(commentsState)
  const [isLoading, setIsLoading] = useState(true)
  const { activeProject, showSettings } = useStore(projectState)
  const { data: currentTabData } = useCurrentTab()

  useEffect(() => {
    syncComments().then(() => {
      setIsLoading(false)
    })
  }, [])

  const addComment = () => {
    sendToContentScript({
      name: "add-comment"
    })
    window.close()
  }

  const navigateTo = () => {
    if (activeProject) {
      chrome.tabs.update({
        active: true,
        url: "https://" + activeProject.domain
      })
      window.close()
    }
  }

  return (
    <ProjectLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col gap-4 p-4 pb-20">
          {comments?.documents.map((comment) => (
            <Comment data={comment} inPopup={true} key={comment.$id} />
          ))}
        </div>
      )}
      <div className="fixed bottom-5 left-0 w-full">
        {currentTabData.hostname == activeProject?.domain ? (
          <button
            className="m-auto flex w-[95%] items-center justify-center gap-1 rounded-md bg-violet-600 p-2 px-4 font-bold text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-gray-500"
            title="Create New Project"
            onClick={addComment}>
            <RiAddFill size={24} />
            Add Comment
          </button>
        ) : (
          <button
            className="m-auto flex w-[95%] items-center justify-center gap-1 rounded-md bg-violet-600 p-2 px-4 font-bold text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-gray-500"
            title="Create New Project"
            onClick={navigateTo}>
            Go to {activeProject?.domain}
            <TbExternalLink size={24} />
          </button>
        )}
      </div>
      <ProjectSettings />
    </ProjectLayout>
  )
}

export default Project
