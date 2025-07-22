import { useContext } from "react"
import notFound from "../assets/images/notFound.svg"
import { Button, Heading, Text } from "../components"
import { Context } from "../context/Context"
import { useNavigate } from "react-router-dom"
import { paths } from "../hooks/path"

const NotFound = () => {
  let {token} = useContext(Context) 
  const navigate = useNavigate()
  return (
    <div className={`w-full h-[100%] flex justify-center items-center ${token ? "" : "mt-[80px]"}`}>
      <div className="space-y-[20px]">
        <img className="ml-[40px]" src={notFound} height={400} alt="" />
        <div className="text-center space-y-[20px]">
          <Heading tag="h3" classList="!text-black">404</Heading>
          <Text classList="!text-black/80">Sorry, the page you visited does not exist</Text>
          <Button onClick={token ? ()=> navigate(paths.home) : ()=> navigate(paths.login)} classList="!bg-blue-500 duration-300 hover:scale-[1.02]">{token ? "Back to home page" : "Got to login"}</Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound