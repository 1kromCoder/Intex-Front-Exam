import { Route, Routes } from 'react-router-dom'
import { NavbarList } from '../hooks/path'

const DashboardRoute = () => {
  return (
    <div className=' h-[90vh] bg-[#f4f4f1]'>
        <Routes>
            {NavbarList.map(item => <Route path={item.path} element={item.element}/>)}
        </Routes>
    </div>
  )
}

export default DashboardRoute