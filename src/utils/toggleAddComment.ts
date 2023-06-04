import commentPopupState from "~states/commentPopupState"
import addComment from "./addComment"
import removeHighlight from "./removeHighlight"
import setHighlight from "./setHighlight"

const toggleAddComment = () => {
  const { addCommentActivated } = commentPopupState.getState()
  if (addCommentActivated) {
    document.removeEventListener("mouseover", setHighlight, true)
    document.removeEventListener("mouseout", removeHighlight, true)
    document.body.removeEventListener("click", addComment, true)
    commentPopupState.setState({
      addCommentActivated: false,
      isVisible: false
    })
  }
  if (!addCommentActivated) {
    document.addEventListener("mouseover", setHighlight, true)
    document.addEventListener("mouseout", removeHighlight, true)
    document.body.addEventListener("click", addComment, true)
    commentPopupState.setState({
      addCommentActivated: true
    })
  }
}

export default toggleAddComment
