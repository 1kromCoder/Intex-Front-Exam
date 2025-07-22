import { Text } from '..'
import { DeleteIcon, OKIcon } from '../../assets/icon'
import type { ConsultType } from '../../types/KonsultType'

const KonsultCard = ({item}: {item: ConsultType}) => {
  return (
    <div className="flex rounded-[30px] bg-[#FFFFFF] py-[10px] px-[50px] overflow-auto">
        <Text classList='!w-[24%]'>{item.name}</Text>
        <Text classList='!w-[33%]'>{item.phone}</Text>
        <Text classList='!w-[31%]'>{item.createdAt.split("T")[0]} {item.createdAt.split("T")[1].split(".")[0].split(":")[0]}:{item.createdAt.split("T")[1].split(".")[0].split(":")[1]}</Text>
        <div className="flex w-[1%] gap-[10px] items-center">
            <div className="cursor-pointer duration-300 hover:scale-[1.1]"><OKIcon/></div>
            <div className="cursor-pointer duration-300 hover:scale-[1.1]"><DeleteIcon/></div>
        </div> 
    </div>
  )
}

export default KonsultCard  