import commentPopupState from "~states/commentPopupState"
import addComment from "./addComment"
import removeHighlight from "./removeHighlight"
import setHighlight from "./setHighlight"

function set(e: MouseEvent) {
  setHighlight(e.target as HTMLElement)
}
function remove(e: MouseEvent) {
  removeHighlight(e.target as HTMLElement)
}

const toggleAddComment = () => {
  const { addCommentActivated } = commentPopupState.getState()
  if (addCommentActivated) {
    document.removeEventListener("mouseover", set, true)
    document.removeEventListener("mouseout", remove, true)
    document.body.removeEventListener("click", addComment, true)
    commentPopupState.setState({
      addCommentActivated: false,
      isVisible: false
    })
  }
  if (!addCommentActivated) {
    document.addEventListener("mouseover", set, true)
    document.addEventListener("mouseout", remove, true)
    document.body.addEventListener("click", addComment, true)
    commentPopupState.setState({
      addCommentActivated: true
    })
  }
}

export default toggleAddComment
