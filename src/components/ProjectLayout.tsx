import React from "react"
import { IoMdSettings } from "react-icons/io"
import { IoArrowBackOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  return (
    <div className="h-[650px] w-[500px] text-base">
      <div className="flex items-center justify-between bg-slate-800 p-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <IoArrowBackOutline size={22} />
          </button>
          <div>Project name</div>
        </div>
        <div>
          <IoMdSettings size={22} />
        </div>
      </div>
      {children}
    </div>
  )
}

export default ProjectLayout
