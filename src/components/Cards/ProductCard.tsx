import { DeleteIcon, EditIcon } from "../../assets/icon"
import { Text } from ".."
import type { ProductType } from "../../types/ProductType"
import { formatPrice } from "../Formatter"
import { API } from "../../service/getEnv"
import { Modal } from "antd"
import { useContext, useState } from "react"
import { deleteRequest } from "../../service/getRequest"
import { Context } from "../../context/Context"
import CreateProduct from "../CreateProduct"
import EditProduct from "../EditProduct"

const ProductCard = ({item}: {item: ProductType}) => {
  const [modal, setModal] = useState<boolean>(false)
  const [form, setForm] = useState<boolean>(false)
  let {token} = useContext(Context)
  async function handleDelete(){
    let deleted = await deleteRequest(`/product/${item.id}`, token=token);
    return deleted
  }
  return (
    <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px] overflow-auto">
          <div className="w-[15%] flex items-center">
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
          <div className="w-[13%] flex items-center"><Text classList="!text-black">{item.size}</Text></div>
          <div className="w-[13%] flex items-center"><Text classList="!text-black">{item.depth}</Text></div>
          <div className="flex gap-[10px] items-center">
            <div onClick={() => setForm(true)} className="cursor-pointer duration-300 hover:scale-[1.1]"><EditIcon/></div>
            <div onClick={() => setModal(true)} className="cursor-pointer duration-300 hover:scale-[1.1]"><DeleteIcon/></div>
          </div> 
          <Modal
        title="Ishonchinggiz komilmi?"
        open={modal}
        okText="O'chirish"
        cancelText="Bekor qilish"
        onCancel={() => {
          setModal(false);
        }}
        onOk={handleDelete}
      />
      {form && <EditProduct category={item.category.name_ru} editData={item} setCreate={setForm}/>}
    </div>
  )
}

export default ProductCard