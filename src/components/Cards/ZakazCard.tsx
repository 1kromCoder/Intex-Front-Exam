import type { ZakazType } from '../../types/ZakazType'
import { formatPrice, Text } from '..'
import { DeleteIcon, OKIcon } from '../../assets/icon'
import { API } from '../../service/getEnv'
import { deleteRequest, patchRequest } from '../../service/getRequest'
import { Context } from '../../context/Context'
import { useContext, useState } from 'react'
import { Modal } from 'antd'

const ZakazCard = ({item}: {item: ZakazType}) => {
  const [modal, setModal] = useState<boolean>(false);
  let {token} = useContext(Context) 
  const handleDelete = async() => {
      let deleted = await deleteRequest(`/order/${item.id}`, token=token);
      return deleted
  }
  
  const handleCheck = async () => {
    let check = await patchRequest(`/order/${item.id}`, {check: !item.check}, token=token);
    return check
  }
  return (
    <div className="flex rounded-[30px] bg-[#FFFFFF] items-center justify-center py-[10px] px-[30px] overflow-auto">
        <Text classList='!w-[22%]'>{item.name}</Text>
        <Text classList='!w-[20%]'>{item.phone}</Text>
        <div className={`!w-[23%] flex items-center`}>
            <img  src={`${API}/file/${item.product.image}`} width={100} height={100} alt="" />
        </div>
          <Text classList='!w-[15%]'>{item.product.depth}</Text>
          <Text classList="!w-[15%]">{formatPrice(item.product.price)}</Text>
          <Text classList="!w-[17%] !text-[14px]">{item.address}</Text>
          <Text classList="!w-[20%]">{item.createdAt.split("T")[0]} {item.createdAt.split("T")[1].split(".")[0].split(":")[0]}:{item.createdAt.split("T")[1].split(".")[0].split(":")[1]}</Text> 
          <div className="flex w-[15%] pl-[1%] gap-[10px] items-center">
            <div onClick={handleCheck} className={`cursor-pointer duration-300 ${item.check ? "text-green-500" : "text-gray-500"} hover:scale-[1.1]`}><OKIcon/></div>
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
    </div>
  )
}

export default ZakazCard