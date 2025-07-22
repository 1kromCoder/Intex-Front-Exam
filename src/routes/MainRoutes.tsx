import { Route, Routes } from 'react-router-dom'
import { paths } from '../hooks/path'
import Login from '../pages/Auth/Login'
import Home from '../pages/Auth/Home'
import NotFound from '../modules/NotFound'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path={paths.home} element={<Home/>}/>
        <Route path={paths.login} element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default MainRoutes