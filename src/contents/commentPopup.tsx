import { zodResolver } from "@hookform/resolvers/zod"
import { useMessage } from "@plasmohq/messaging/hook"
import cssText from "data-text:~styles/styles.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { BiCommentDetail } from "react-icons/bi"
import * as z from "zod"
import { useStore } from "zustand"
import useAccount from "~hooks/useAccount"
import useComments from "~hooks/useComments"
import commentPopupState from "~states/commentPopupState"
import projectState from "~states/projectState"
import toggleAddComment from "~utils/toggleAddComment"

const formSchema = z.object({
  comment: z.string().min(1)
})

const CommentPopup = () => {
  const {
    isVisible,
    positionX,
    positionY,
    xPath,
    toggleIsCommentPopupVisible
  } = useStore(commentPopupState)
  const { activeProject } = useStore(projectState)
  const { user } = useAccount()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { register, handleSubmit, formState, reset } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: ""
    }
  })
  const { addComment, syncComments } = useComments()
  useMessage<string, string>(async (req, res) => {
    if (req.name == "add-comment") {
      toggleAddComment()
      toggleIsCommentPopupVisible()
    }
  })

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
    toggleIsCommentPopupVisible()
    toggleAddComment()
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const pathname = window.location.pathname
    if (activeProject && user)
      await addComment({
        message: data.comment,
        pathname,
        positionX: Math.trunc(positionX),
        positionY: Math.trunc(positionY),
        innerWidth: window.innerWidth,
        project: activeProject.$id,
        xPath,
        owner: user.name
      })
    else
      throw new Error(
        "Active project or User not found after submitting comment"
      )
    syncComments()
    toggleIsCommentPopupVisible()
    toggleAddComment()
    reset()
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full rounded-md p-2 text-sm"
            placeholder="Your Comment goes here..."
            type="text"
            {...register("comment")}
          />
          <div className="mt-2 text-xs text-red-500">
            {formState.errors.comment?.message}
          </div>
          <div className="mt-4 flex items-center justify-between ">
            <button
              type="submit"
              className="rounded-md bg-violet-500 p-2 px-4 text-sm font-semibold text-white hover:bg-violet-700 active:bg-violet-800 disabled:bg-gray-500">
              Add
            </button>
            <button
              onClick={handleCancel}
              className="rounded-md bg-red-500 p-2 px-4 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800 disabled:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
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
