import { DeleteIcon, EditIcon } from "../../assets/icon"
import { Text } from ".."
import type { ProductType } from "../../types/ProductType"
import { formatPrice } from "../Formatter"
import { API } from "../../service/getEnv"

const ProductCard = ({item}: {item: ProductType}) => {
  return (
    <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px] overflow-auto">
          <div className="w-[14%] flex items-center">
            <img  src={`${API}/file/${item.image}`} width={100} height={100} alt="" />
          </div>
          <div className="w-[20%]">
            <div className="relative">
              <Text>{item.price} сум</Text>
              <div className="absolute w-[85px] bg-red-500 h-[1px] z-10 top-[15px] rotate-[8deg]"></div>
            </div>
            <Text classList="!font-bold !text-black">{formatPrice(item.discountedPrice)} сум</Text>
          </div>
          <div className="w-[10%] flex items-center"><Text classList="!text-black">{item.count}</Text></div>
          <div className="w-[18%] flex items-center"><Text classList="!text-black">{item.frame_ru}</Text></div>
          <div className="w-[14%] flex items-center"><Text classList="!text-black">{item.size}</Text></div>
          <div className="w-[12%] flex items-center"><Text classList="!text-black">{item.depth}</Text></div>
          <div className="flex gap-[10px] items-center">
            <div className="cursor-pointer duration-300 hover:scale-[1.1]"><EditIcon/></div>
            <div className="cursor-pointer duration-300 hover:scale-[1.1]"><DeleteIcon/></div>
          </div> 
    </div>
  )
}

export default ProductCard