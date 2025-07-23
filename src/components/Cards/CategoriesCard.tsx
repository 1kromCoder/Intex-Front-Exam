import { Modal } from 'antd'
import { DeleteIcon, EditIcon } from '../../assets/icon'
import type { CategoryType } from '../../types/CategoryType'
import Text from '../Text'
import { use, useContext, useState } from 'react'
import { Context } from '../../context/Context'
import { deleteRequest } from '../../service/getRequest'
import CreateCategory from '../CreateCategory'

const CategoriesCard = ({item}: {item: CategoryType}) => {
  const [modal, setModal] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);
  let {token} = useContext(Context)
  const handleDelete = async() => {
    let deleted = await deleteRequest(`/category/${item.id}`, token=token);
    window.location.reload()
    return deleted
  }
  return (
    <div className='flex rounded-[30px] bg-[#FFFFFF] items-center py-[17px] px-[50px]'>
        <Text classList='!text-black w-[45%]'>{item.name_ru}</Text>
        <Text classList='!text-black w-[50%]'>{item.name_uz}</Text>
        <div className="flex gap-[10px] w-[7%] items-center">
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
      {form && <CreateCategory setCreate={setForm} heading="Kategoriya o'zgartirish" inputs={[{label: "Название", name:"name_ru", value: item.name_ru}, {label: "На узбекском", name:"name_uz", value: item.name_uz}]} url={`/category/${item.id}`} method="PATCH"/>}
    </div>
  )
}

export default CategoriesCard