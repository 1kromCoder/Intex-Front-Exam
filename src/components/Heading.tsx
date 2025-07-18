import type { ReactNode } from "react"

const Heading = ({children,classList, tag}:{children:ReactNode, classList?:string, tag:"h1" | "h2" | "h3"}) => {
  
  if(tag == "h1"){
    return <h1 className={`font-semibold text-[#009398] text-[38px] leading-[130%] lg:text-[67px] lg:leading-[101%]  ${classList}`}>{children}</h1>
  }
  if(tag == "h2"){
    return <h2 className={`font-semibold text-[#009398] text-[38px] leading-[101%] ${classList}`}>{children}</h2>
  }
  if(tag == "h3"){
    return <h1 className={`font-semibold text-[#009398] text-[22px] lg:text-[28px] leading-[140%] ${classList}`}>{children}</h1>
  }
}

export default Heading