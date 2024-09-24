import { useEffect, useRef } from "react"
import { BiCommentDetail } from "react-icons/bi"
import drawerState from "~states/drawerState"
import getElementByXPath from "~utils/getElementByXPath"
import removeHighlight from "~utils/removeHighlight"
import setHighlight from "~utils/setHighlight"
import type { CommentDocument } from "~utils/types"

const CommentMarker = ({ comment }: { comment: CommentDocument }) => {
  const commentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    handleOutsideViewport()
  }, [])

  const onMouseOver = () => {
    const container = commentRef.current
    setHighlight(getElementByXPath(comment.xPath))
    container?.style.setProperty("opacity", "1")
  }

  const handleOutsideViewport = () => {
    const preview = commentRef.current
    if (preview) {
      const { right, left } = preview.getBoundingClientRect()
      if (right > window.innerWidth)
        preview.style.left =
          left -
          (right - window.innerWidth) -
          44 +
          window.scrollX -
          comment.positionX +
          "px"
    }
  }

  const onMouseOut = () => {
    const container = commentRef.current
    removeHighlight(getElementByXPath(comment.xPath))
    container?.style.setProperty("opacity", "0")
  }

  return (
    <div
      className="absolute flex cursor-pointer items-center justify-center rounded-full bg-violet-600 p-2 text-white"
      style={{ left: comment.positionX, top: comment.positionY }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => drawerState.setState({ isVisible: true })}>
      <BiCommentDetail size={16} className="" />
      <div
        ref={commentRef}
        className="pointer-events-none absolute bottom-[-110px] w-44 rounded-md bg-slate-900 p-2.5 opacity-0 ring-2 ring-slate-800">
        <div>
          <div className="text-xs font-bold text-slate-300">
            {comment.owner}
          </div>
          <div className="text-xs text-slate-500">
            {new Date(comment.$createdAt).toLocaleString()}
          </div>
        </div>
        <hr className="my-2 border-slate-500" />
        {comment.message}
      </div>
    </div>
  )
}

export default CommentMarker
