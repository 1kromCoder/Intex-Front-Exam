import type { ReactNode } from "react"

const Text = ({children, classList}:{children:ReactNode, classList?:string}) => {
  return (
   <p className={` text-[20px] font-normal ${location.pathname.includes("zakaz") ? "text-black" : "text-[#CCCCCC]"} ${classList}`}>{children}</p>
  )
}

export default Text