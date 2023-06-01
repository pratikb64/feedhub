import React from "react"
import Logo from "./Logo"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[650px] w-[500px] text-base">
      <div className="flex justify-center py-8">
        <Logo size={40} wrapperProps={{ className: "text-3xl" }} />
      </div>
      {children}
    </div>
  )
}

export default AuthLayout
