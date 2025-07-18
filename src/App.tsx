import { useContext } from "react"
import { Context } from "./context/Context"
import MainRoutes from "./routes/MainRoutes"
import Layout from "./features/Layout"

function App() {
  const {token } = useContext(Context)
  return token ? <Layout/> : <MainRoutes/>
}

export default App
