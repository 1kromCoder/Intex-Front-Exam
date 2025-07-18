import type { ReactNode } from "react"

const Text = ({children, classList}:{children:ReactNode, classList?:string}) => {
  return (
   <p className={`text-[#CCCCCC] text-[20px] font-normal ${classList}`}>{children}</p>
  )
}

export default Text