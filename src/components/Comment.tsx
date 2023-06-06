import { sendToContentScript } from "@plasmohq/messaging"
import { BsTrash } from "react-icons/bs"
import { MdMyLocation } from "react-icons/md"
import useComments from "~hooks/useComments"
import dateDifference from "~utils/dateDifference"
import focusElement from "~utils/focusElement"
import type { CommentDocument } from "~utils/types"

const Comment = ({
  data,
  inPopup = false
}: {
  data: CommentDocument
  inPopup?: boolean
}) => {
  const { deleteComment, syncComments } = useComments()

  const deleteHandler = async () => {
    await deleteComment({ commentId: data.$id }).then(() => {
      syncComments()
    })
  }

  const highlightElement = () => {
    if (inPopup) {
      return sendToContentScript({
        name: "locate-comment",
        body: data.xPath
      })
    }
    focusElement(data.xPath)
  }

  return (
    <div className="w-full rounded-md border-2 border-gray-700 text-sm">
      <div className="flex items-center justify-between bg-slate-800 p-2 px-3">
        <div className="font-bold">
          {data.owner}{" "}
          <span className="text-[10px] font-normal">
            • {dateDifference(new Date(data.$createdAt))}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-md p-1 hover:bg-gray-600"
            title="Locate comment"
            onClick={highlightElement}>
            <MdMyLocation size={18} />
          </button>
          <button
            className=" rounded-md p-1 text-red-500 hover:bg-slate-600"
            title="Delete comment"
            onClick={deleteHandler}>
            <BsTrash size={18} />
          </button>
        </div>
      </div>
      <hr className="border-gray-700" />
      <div className=" p-3">{data.message}</div>
    </div>
  )
}

export default Comment
