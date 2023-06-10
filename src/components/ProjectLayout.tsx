import React from "react"
import { IoMdSettings } from "react-icons/io"
import { IoArrowBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useStore } from "zustand"
import projectState from "~states/projectState"

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const { activeProject, toggleShowSettings } = useStore(projectState)
  return (
    <div className="h-[650px] w-[500px] text-base">
      <div className="flex items-center justify-between bg-slate-800 p-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} title="Go back">
            <IoArrowBackOutline size={22} />
          </button>
          <div className="flex items-center gap-2 font-bold">
            <img
              src={"https://icon.horse/icon/" + activeProject?.domain}
              alt="favicon"
              className="w-6"
            />
            {activeProject?.domain}
          </div>
        </div>
        <button onClick={toggleShowSettings} title="Settings">
          <IoMdSettings size={22} />
        </button>
      </div>
      {children}
    </div>
  )
}

export default ProjectLayout
