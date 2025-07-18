import type { ReactNode } from "react"

const Button = ({children, classList, onClick, type="button"}:{children:ReactNode, classList?:string, onClick?:() => void, type?:"button" | "submit"}) => {
  return (
    <button onClick={onClick} type={type} className={`px-[20px] py-[10px] text-center bg-[#3F8C8E] rounded-[10px] text-white text-[25px] cursor-pointer font-semibold  ${classList}`}>{children}</button>
  )
}

export default Button