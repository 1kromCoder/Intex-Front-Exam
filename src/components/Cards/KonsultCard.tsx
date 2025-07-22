import { useContext, useState } from 'react'
import { Text } from '..'
import { DeleteIcon, OKIcon } from '../../assets/icon'
import type { ConsultType } from '../../types/KonsultType'
import { Context } from '../../context/Context'
import { deleteRequest } from '../../service/getRequest'
import { Modal } from 'antd'

const KonsultCard = ({item}: {item: ConsultType}) => {
  const [modal, setModal] = useState<boolean>(false)
    let {token} = useContext(Context)
    async function handleDelete(){
      let deleted = await deleteRequest(`/consultation/${item.id}`, token=token);
      return deleted
    }
  return (
    <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px] overflow-auto">
        <Text classList='!w-[24%]'>{item.name}</Text>
        <Text classList='!w-[33%]'>{item.phone}</Text>
        <Text classList='!w-[31%]'>{item.createdAt.split("T")[0]} {item.createdAt.split("T")[1].split(".")[0].split(":")[0]}:{item.createdAt.split("T")[1].split(".")[0].split(":")[1]}</Text>
        <div className="flex w-[1%] gap-[10px] items-center">
            <div className="cursor-pointer duration-300 hover:scale-[1.1]"><OKIcon/></div>
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

export default KonsultCard  