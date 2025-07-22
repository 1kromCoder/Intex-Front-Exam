import { useContext } from "react"
import { Context } from "./context/Context"
import MainRoutes from "./routes/MainRoutes"
import Layout from "./features/Layout"
import { Toaster } from "react-hot-toast"

function App() {
  const {token } = useContext(Context)
  return(
    <>
    <Toaster position="top-center"/>
    {token ? <Layout/> : <MainRoutes/>}
    </>
  )
}

export default App
