import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"
import { useStore } from "zustand"
import CommentMarker from "~components/CommentMarker"
import useComments from "~hooks/useComments"
import commentsState from "~states/commentsState"
import projectState from "~states/projectState"
import fixPlasmoContainerZIndex from "~utils/fixPlasmoContainerZIndex"
import observeUrlChange from "~utils/observeUrlChange"
import type { CommentDocument } from "~utils/types"

const CommentMarkerRenderer = () => {
  const { setComments } = useStore(commentsState)
  const { isProductFetching } = useStore(projectState)
  const { allComments } = useComments()
  const [currentComments, setCurrentComments] = useState<
    CommentDocument[] | []
  >([])
  const childRef = useRef<HTMLDivElement | null>(null)

  const filterComments = (comments: CommentDocument[]) => {
    const pathname = window.location.pathname
    const filteredComments = comments?.filter(
      (comment) => comment.pathname == pathname
    )
    setCurrentComments(filteredComments)
  }

  useEffect(() => {
    if (!isProductFetching)
      allComments().then((comments) => {
        setComments(comments)
        filterComments(comments.documents)
      })

    // A hack to adjust plasmo container zIndex to avoid overlap with side drawer
    fixPlasmoContainerZIndex(childRef.current)
  }, [isProductFetching])

  useEffect(() => {
    const observer = observeUrlChange((url) => {
      const comments = commentsState.getState().comments
      if (comments) filterComments(comments.documents)
    })
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={childRef}>
      {currentComments.map((comment) => {
        return <CommentMarker key={comment.$id} comment={comment} />
      })}
    </div>
  )
}

export default CommentMarkerRenderer

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  run_at: "document_idle"
}
