import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef } from "react"
import { BiCommentDetail } from "react-icons/bi"
import { useStore } from "zustand"
import commentPopupState from "~states/commentPopupState"
import toggleAddComment from "~utils/toggleAddComment"

const CommentPopup = () => {
  const { isVisible, positionX, positionY, xPath, toggle } =
    useStore(commentPopupState)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Check if comment popup is going out of viewport and adjust it with offset
    const container = containerRef.current
    if (container) {
      const { right, left, bottom, top } = container.getBoundingClientRect()
      if (right > window.innerWidth)
        container.style.left =
          left - (right - window.innerWidth) - 16 + window.scrollX + "px"
      if (bottom > window.innerHeight)
        container.style.top =
          top - (bottom - window.innerHeight) - 16 + window.scrollY + "px"
    }
  }, [positionX, positionY])

  const handleCancel = () => {
    toggle()
    toggleAddComment()
  }

  if (!isVisible) return <></>
  return (
    <div className="font-poppins text-gray-50">
      <div
        className="absolute flex items-center justify-center rounded-full bg-violet-600 p-2"
        style={{ left: positionX, top: positionY }}>
        <BiCommentDetail size={16} className="text-white" />
      </div>
      <div
        className="absolute w-72 rounded-md bg-slate-900 p-4 ring-2 ring-slate-800"
        style={{ left: positionX + 30, top: positionY + 36 }}
        ref={containerRef}>
        <input
          className="w-full rounded-md p-2 text-sm"
          placeholder="Your Comment goes here..."
          type="text"
        />
        <div className="mt-4 flex items-center justify-between ">
          <button className="rounded-md bg-violet-500 p-2 px-4 text-sm font-semibold text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-gray-500">
            Add
          </button>
          <button
            onClick={handleCancel}
            className="rounded-md bg-red-500 p-2 px-4 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800 disabled:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentPopup

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  run_at: "document_idle"
}
