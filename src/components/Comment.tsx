const Comment = () => {
  return (
    <div className="w-full rounded-md border-2 border-gray-700 p-3 text-sm">
      <div className="font-bold">
        John snow <span className="text-xs font-normal">• 2 min ago</span>
      </div>
      <hr className="-mx-3 my-3 border-gray-700" />
      <div className="">Some Message</div>
    </div>
  )
}

export default Comment
