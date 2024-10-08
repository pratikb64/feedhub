import { sendToContentScript } from "@plasmohq/messaging"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import { BsThreeDots, BsTrash } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useStore } from "zustand"
import useCurrentTab from "~hooks/useCurrentTab"
import useDatabase from "~hooks/useDatabase"
import useTeams from "~hooks/useTeams"
import projectState from "~states/projectState"
import type { ProjectDocument } from "~utils/types"
import ProjectSettings from "./ProjectSettings"

const ProjectItem = ({
  data,
  getProjects
}: {
  data: ProjectDocument
  getProjects: () => void
}) => {
  const [deleteClicked, setDeleteClicked] = useState(false)
  const { deleteDocument } = useDatabase()
  const { deleteTeam } = useTeams()
  const navigate = useNavigate()
  const { setActiveProject } = useStore(projectState)
  const { currentTabData } = useCurrentTab()

  const deleteHandler = async () => {
    //TODO: delete all comments relate to respective project
    await deleteDocument({ collectionId: "projects", documentId: data.$id })
      .then(() => {
        getProjects()
      })
      .catch((err) => {
        console.log(err)
      })
    await deleteTeam()
  }

  const openHandler = async () => {
    navigate("/project/" + data.$id)
    setActiveProject(data)
    if (currentTabData.hostname == data.domain)
      await sendToContentScript({
        name: "activate-project",
        body: data.$id
      })
  }

  return (
    <div className="flex cursor-pointer items-center justify-between rounded-md border-2 border-gray-700 p-2 transition-colors hover:bg-violet-800">
      <div className="w-full font-semibold" onClick={openHandler}>
        {data.domain}
      </div>
      <div>
        <DropdownMenu.Root
          onOpenChange={() => {
            setDeleteClicked(false)
          }}
          modal={false}>
          <DropdownMenu.Trigger asChild>
            <button
              aria-label="Profile menu"
              className="flex items-center gap-1"
              title="More options">
              <BsThreeDots size={22} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-32 rounded-md bg-slate-800 p-2 shadow-lg"
              sideOffset={2}
              collisionPadding={{
                right: 15
              }}>
              {deleteClicked ? (
                <DropdownMenu.Item className="rounded-md outline-none hover:bg-slate-700">
                  <button
                    onClick={deleteHandler}
                    className="flex w-full items-center gap-1 p-2 font-semibold text-red-500"
                    title="Delete project confirmation">
                    Are you sure?
                  </button>
                </DropdownMenu.Item>
              ) : (
                <div className="rounded-md outline-none hover:bg-slate-700">
                  <button
                    onClick={() => setDeleteClicked(true)}
                    className="flex w-full items-center gap-1  p-2 font-semibold text-red-500"
                    title="Delete project">
                    <BsTrash size={16} />
                    Delete
                  </button>
                </div>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <ProjectSettings />
    </div>
  )
}

export default ProjectItem
