import { type HTMLAttributes } from "react"
import type { IconBaseProps } from "react-icons"
import { RiChatCheckFill } from "react-icons/ri"
import { twMerge } from "tailwind-merge"

/**
 *  Base styles
 *  @param Wrapper flex items-center gap-1 text-xl font-black
 *  @param SVG text-violet-500
 *  @param Size 28
 */
const Logo = ({
  size = 28,
  wrapperProps,
  svgProps
}: {
  size?: number
  wrapperProps?: HTMLAttributes<HTMLDivElement>
  svgProps?: IconBaseProps
}) => {
  return (
    <div
      {...wrapperProps}
      className={twMerge(
        "flex items-center gap-1 text-xl font-black",
        wrapperProps?.className
      )}>
      <RiChatCheckFill
        size={size}
        {...svgProps}
        className={twMerge("text-violet-500", svgProps?.className)}
      />
      Feedhub
    </div>
  )
}

export default Logo
