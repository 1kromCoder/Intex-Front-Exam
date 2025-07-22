import { Menu } from 'antd'
import { NavbarNavList } from '../../hooks/path'
import Heading from '../../components/Heading'

const Navbar = () => {
  return (
    <div className='space-y-[15px] h-screen w-[23%] bg-[#ffff]'>
        <div className='py-[20px] border-b-[3px] border-b-[#EBEBFF] pl-[20px]'>
            <Heading tag="h3" classList='!text-[22px]'>INTEX-MARKET.UZ</Heading>
        </div>
        <div className='pl-[10px]'>
            <Menu className='!text-[20px]'
            defaultSelectedKeys={['20']}
            mode="vertical"
            theme="light"
            // @ts-ignore
            items={NavbarNavList}
        />  
        </div>
    </div>
  )
}

export default Navbar