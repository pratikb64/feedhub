import { BiCommentDetail } from "react-icons/bi"
import drawerState from "~states/drawerState"
import getElementByXPath from "~utils/getElementByXPath"
import removeHighlight from "~utils/removeHighlight"
import setHighlight from "~utils/setHighlight"
import type { CommentDocument } from "~utils/types"

const CommentMarker = ({ comment }: { comment: CommentDocument }) => {
  return (
    <div
      className="absolute flex cursor-pointer items-center justify-center rounded-full bg-violet-600 p-2"
      style={{ left: comment.positionX, top: comment.positionY }}
      onMouseOver={() => setHighlight(getElementByXPath(comment.xPath))}
      onMouseOut={() => removeHighlight(getElementByXPath(comment.xPath))}
      onClick={() => drawerState.setState({ isVisible: true })}>
      <BiCommentDetail size={16} className="text-white" />
    </div>
  )
}

export default CommentMarker
