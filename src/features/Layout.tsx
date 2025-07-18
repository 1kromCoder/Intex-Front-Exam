import Header from '../modules/Header'
import Navbar from '../modules/Navbar/Navbar'
import DashboardRoute from '../routes/DashboardRoute'

const Layout = () => {
  return (
    <div className='flex'>
        <Navbar/>
        <div className={`w-[82%]`}>
            <Header/>
            <DashboardRoute/>
        </div>
    </div>
  )
}

export default Layout