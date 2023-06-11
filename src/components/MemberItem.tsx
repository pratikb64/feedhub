import type { Models } from "appwrite"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { BsTrash } from "react-icons/bs"
import { RiCloseFill } from "react-icons/ri"

const MemberItem = ({
  member,
  isOwner,
  deleteMember,
  syncTeamMembers
}: {
  member: Models.Membership
  isOwner: boolean
  deleteMember: (memberId: string) => Promise<void>
  syncTeamMembers: () => Promise<void>
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteHandler = () => {
    if (member.roles.includes("owner"))
      return toast.error("Cannot remove owner!")
    deleteMember(member.$id).then(() => {
      syncTeamMembers()
      setIsDeleting(false)
      toast.success("Member deleted!")
    })
  }
  return (
    <div className="group flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div>
          <img
            className="w-10"
            src={`https://ui-avatars.com/api/?rounded=true&format=png&name=${member.userName}`}
            alt="favicon"
          />
        </div>
        <div>
          <div>{member.userName}</div>
          <div className="text-xs text-slate-500">{member.userEmail}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {member.roles.map((role) => (
            <div
              key={role}
              className="flex h-max items-center justify-center rounded-full bg-slate-700 px-2 py-1 text-xs">
              {role.toUpperCase()}
            </div>
          ))}
        </div>
        {isOwner && (
          <button
            onClick={() => setIsDeleting(true)}
            className="hidden rounded-md bg-red-600 p-2 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800 disabled:bg-gray-500 group-hover:block">
            <BsTrash size={18} />
          </button>
        )}
      </div>
      <div
        className={`fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-[2px] transition-all  ease-in-out ${
          isDeleting
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}>
        <div
          className={`absolute left-1/2  w-[90%] -translate-x-1/2 -translate-y-1/2 transform  rounded-lg bg-slate-900 p-4 shadow-lg ring-2 ring-slate-800 transition-all ease-in-out ${
            isDeleting ? "top-1/2" : "top-[40%]"
          }`}>
          <div>
            <div>Are you sure you want to remove {member.userName}?</div>
            <button
              onClick={deleteHandler}
              className="mt-6 rounded-md bg-red-600 p-2 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800	disabled:bg-gray-500">
              Yes, Remove
            </button>
          </div>
          <button
            onClick={() => setIsDeleting(false)}
            className="absolute right-3 top-3">
            <RiCloseFill size={22} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberItem
