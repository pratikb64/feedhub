import { BsTrash } from "react-icons/bs"
import { MdMyLocation } from "react-icons/md"
import dateDifference from "~utils/dateDifference"
import getElementByXPath from "~utils/getElementByXPath"
import removeHighlight from "~utils/removeHighlight"
import setHighlight from "~utils/setHighlight"
import type { CommentDocument } from "~utils/types"

const Comment = ({ data }: { data: CommentDocument }) => {
  const focusElement = () => {
    const element = getElementByXPath(data.xPath)
    if (element) {
      element.focus()
      element.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
      setHighlight(element)
      setTimeout(() => {
        removeHighlight(element)
      }, 700)
    }
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
            onClick={focusElement}>
            <MdMyLocation size={18} />
          </button>
          <button
            className=" rounded-md p-1 text-red-500 hover:bg-slate-600"
            title="Delete comment">
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
