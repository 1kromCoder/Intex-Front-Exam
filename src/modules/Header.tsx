import { UserIcon } from '../assets/icon'
import Text from '../components/Text'

const Header = () => {
  return (
    <div className='py-[20.5px] px-[40px] flex justify-between border-b-[3px] bg-[#f4f4f1] border-b-[#EBEBFF]'>
        <div></div>
        <div className='flex gap-[60px]'>
            <a href="http://44.201.132.40/api/#/" target='_blank'><Text classList='!text-[#A6A6A6] cursor-pointer hover:underline'>Просмотр веб-сайта</Text></a>
            <Text classList='flex gap-[10px] !text-[#A6A6A6]'><UserIcon/>Joe Melton</Text>
        </div>
    </div>
  )
}

export default Header