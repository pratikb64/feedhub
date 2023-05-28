import useAccount from "~hooks/useAccount"

const Navbar = () => {
  const { user } = useAccount()
  return (
    <nav>
      <div className="flex justify-between p-4 ">
        <div className="text-xl font-black">Feedhub</div>
        <div>{user?.name}</div>
      </div>
      <hr />
    </nav>
  )
}

export default Navbar
