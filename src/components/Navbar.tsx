import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { BiLogOut } from "react-icons/bi"
import { FaChevronDown } from "react-icons/fa"
import useAccount from "~hooks/useAccount"
import Logo from "./Logo"

const Navbar = () => {
  const { user, logout } = useAccount()
  return (
    <nav>
      <div className="flex justify-between p-4 ">
        <Logo />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              aria-label="Profile menu"
              className="flex items-center gap-1">
              {user?.name}
              <FaChevronDown size={14} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="w-28 rounded-md bg-slate-800 p-2 shadow-lg"
              sideOffset={5}>
              <DropdownMenu.Item
                className="cursor-pointer rounded-md p-2 outline-none hover:bg-slate-700"
                onClick={logout}>
                <button className="flex items-center gap-1">
                  <BiLogOut size={20} className="m-0" /> <div>Logout</div>
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Arrow className="DropdownMenuArrow" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <hr />
    </nav>
  )
}

export default Navbar
