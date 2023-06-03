import React from "react"
import { IoMdSettings } from "react-icons/io"
import { IoArrowBackOutline } from "react-icons/io5"

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[650px] w-[500px] text-base">
      <div className="flex items-center justify-between bg-slate-800 p-4">
        <div className="flex items-center gap-4">
          <IoArrowBackOutline size={22} />
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
