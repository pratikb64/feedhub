import { BsTrash } from "react-icons/bs"
import { MdMyLocation } from "react-icons/md"
import dateDifference from "~utils/dateDifference"
import type { CommentDocument } from "~utils/types"

const Comment = ({ data }: { data: CommentDocument }) => {
  return (
    <div className="w-full rounded-md border-2 border-gray-700 p-3 text-sm">
      <div className="flex items-center justify-between">
        <div className="font-bold">
          {data.owner}{" "}
          <span className="text-[10px] font-normal">
            • {dateDifference(new Date(data.$createdAt))}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-md p-1 hover:bg-gray-600"
            title="Locate comment">
            <MdMyLocation size={18} />
          </button>
          <button
            className=" rounded-md p-1 text-red-500 hover:bg-slate-700"
            title="Delete comment">
            <BsTrash size={18} />
          </button>
        </div>
      </div>
      <hr className="-mx-3 my-3 border-gray-700" />
      <div className="">{data.message}</div>
    </div>
  )
}

export default Comment
