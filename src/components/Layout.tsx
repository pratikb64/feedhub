import React from "react"
import useAccount from "~hooks/useAccount"
import Navbar from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAccount()
  return (
    <div className="h-[650px] w-[500px] text-base">
      {user && <Navbar />}
      {children}
    </div>
  )
}

export default Layout
