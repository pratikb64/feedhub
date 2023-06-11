import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAccount from "~hooks/useAccount"
import LoadingScreen from "./LoadingScreen"
import Navbar from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    if (user) navigate("/")
    else navigate("/login")
  }, [user?.$id, isLoading])

  return (
    <div className="h-[650px] w-[500px] text-base">
      <Navbar />
      {children}
      {isLoading && <LoadingScreen />}
    </div>
  )
}

export default Layout
