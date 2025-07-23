import { useContext, useState } from 'react';
import { Form, Input, Tag } from 'antd';
import { CategoryIcon, CountIcon, PriceIcon, RamkaIcon, RazmerIcon, StatusIcon } from '../assets/icon';
import CustomSelect from './CustomSelect';
import Button from './Button';
import ArraySelect from './CustomArraySelect';
import { postRequest } from "../service/getRequest";
import toast from 'react-hot-toast';
import { Context } from '../context/Context';
import axios from 'axios';
import { API } from '../service/getEnv';
import type { ProductType } from '../types/ProductType';

type RequiredMark = boolean | 'optional' | 'customize';

const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
    {label}
  </>
);

const EditForm = ({ category, categoryData, toolRu, toolUz, file, editData, image }: {image?: string | null, editData?: ProductType, file:File | null, toolRu: any[], toolUz: any[], category: string, categoryData: any }) => {
  console.log("image", image);
  
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
  const {toolsRU, toolsUz, token} = useContext(Context)
  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

async function handleSubmit(values: any) {
  try {
    let imageName = editData?.image || "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const filename = await axios.post(`${API}/file`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageName = filename.data.filename;
    }

    const payload = {
      image: editData?.image || imageName,
      categoryId: editData?.categoryId || values.cateogry,
      price: Number(values["Стартовая цена (сум)"]),
      count: Number(values["Количество"]),
      discountedPrice: Number(values["Цена со скидкой (сум)"]),
      frame_ru: values["Рамка"],
      frame_uz: values["Рамка на узбекском"],
      size: values["Размер (м)"],
      depth: editData?.depth || values.depth,
      status: values.status,
      tools_ru: values.Комплектация || [],
      tools_uz: values['Комплектация на узбекском'] || [],
    };

    console.log("Payload:", payload);

    if (editData) {
      // PATCH if editing
      await axios.patch(`${API}/product/${editData.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product updated successfully!");
    } else {
      // POST if creating
      await postRequest("/product", payload, token);
      toast.success("Product created successfully!");
    }

    form.resetFields();
  } catch (err: any) {
    toast.error(err?.message || "An error occurred");
  }
}

  const initialValues = {
    requiredMarkValue: requiredMark,
    cateogry: editData?.category.id || categoryData?.length > 0 ? categoryData.find((item: any) => item.title === category)?.id : undefined,
    status: editData?.status || 'Рекомендуем',
    Комплектация: editData?.tools_ru || [],
    depth: editData?.depth || 0,
    size: editData?.size || '',
    'Стартовая цена (сум)': editData?.price || 0,
    'Цена со скидкой (сум)': editData?.discountedPrice || 0,
    'Количество': editData?.count || 0,
    'Рамка': editData?.frame_ru || '',
    'Рамка на узбекском': editData?.frame_uz || '',
    'Комплектация на узбекском': editData?.tools_uz || [],
    image: editData?.image || '',
  };

  console.log(categoryData, 'categoryData');
  
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onValuesChange={onRequiredTypeChange}
      onFinish={handleSubmit}
      requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
    >
      <div>
        <div className='flex gap-[65px]'>
          <div>
            <Form.Item
            initialValue={editData?.category.name_ru}
  name="cateogry"
  label="Категория"
  rules={[{ required: true, message: 'Выберите категорию' }]}
>
  <div className='flex relative items-center'>
    <div className='absolute z-1 left-[-30px]'><CategoryIcon/></div>
  <CustomSelect
  defaultValue={editData?.category.name_ru}
    selectData={categoryData.map((item: any) => ({
      value: item.id,
      label: item.title,
    }))}
  />
  </div>
</Form.Item>
            <Form.Item
            initialValue={editData?.price}
              rules={[{ required: true, message: 'Please enter a starting price' }]}
              className="!mb-[5px]"
              name="Стартовая цена (сум)"
              label="Стартовая цена (сум)"
              required
              tooltip="Стартовая цуна продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><PriceIcon /></div>
                <Input
                  defaultValue={editData?.price} className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='number'
                />
              </div>
            </Form.Item>
            <Form.Item
            initialValue={editData?.count}
              rules={[{ required: true, message: 'Please enter a frame type' }]}
              className="!mb-[5px]"
              name="Рамка"
              label="Рамка"
              required
              tooltip="Рамка продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><RamkaIcon /></div>
                <Input
                  defaultValue={editData?.frame_ru} className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
            <Form.Item
            initialValue={editData?.size}
              rules={[{ required: true, message: 'Please enter a size' }]}
              className="!mb-[5px]"
              name="Размер (м)"
              label="Размер (м)"
              required
              tooltip="Размер продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><RazmerIcon /></div>
                <Input
                  defaultValue={editData?.size} className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
            <Form.Item
            initialValue={editData?.depth}
              rules={[{ required: true, message: 'Please select a status' }]}
              className="!mb-[5px]"
              name="status"
              label="Статус"
              required
              tooltip="Статус продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><StatusIcon /></div>
                <CustomSelect
                defaultValue={editData?.status}
                  selectData={[
                    { value: 'Рекомендуем', label: 'Рекомендуем' },
                    { value: 'Нет_в_наличии', label: 'Нет_в_наличии' },
                    { value: 'Скидка', label: 'Скидка' },
                  ]}
                />
              </div>
            </Form.Item>
          </div>
          <div>
            <Form.Item
            initialValue={editData?.count}
              rules={[{ required: true, message: 'Please enter a quantity' }]}
              className="!mb-[5px]"
              name="Количество"
              label="Количество"
              required
              tooltip="Количество продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><CountIcon /></div>
                <Input
                  defaultValue={editData?.count} className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='number'
                />
              </div>
            </Form.Item>
            <Form.Item
            initialValue={editData?.discountedPrice}
              rules={[{ required: true, message: 'Please enter a discounted price' }]}
              className="!mb-[5px]"
              name="Цена со скидкой (сум)"
              label="Цена со скидкой (сум)"
              required
              tooltip="Цена со скидкой (сум) продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><PriceIcon /></div>
                <Input
                  defaultValue={editData?.discountedPrice} className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='number'
                />
              </div>
            </Form.Item>
            <Form.Item
            initialValue={editData?.frame_uz}
              rules={[{ required: true, message: 'Please enter a frame type in Uzbek' }]}
              className="!mb-[5px]"
              name="Рамка на узбекском"
              label="Рамка на узбекском"
              required
              tooltip="Рамка на узбекском продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><RamkaIcon /></div>
                <Input
                  defaultValue={editData?.frame_ru} className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
            <Form.Item
            initialValue={editData?.frame_ru}
              rules={[{ required: true, message: 'Please enter a depth' }]}
              className="!mb-[5px]"
              name="Глубина (см)"
              label="Глубина (см)"
              required
              tooltip="Глубина продукта"
            >
              <div className='flex relative items-center'>
                <div className='absolute z-1 left-[-30px]'><RazmerIcon /></div>
                <Input
                  defaultValue={editData?.depth} className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
          </div>
        </div>
        <div>
          <Form.Item
          initialValue={editData?.tools_ru}
            className="!mb-[5px]"
            name="Комплектация"
          >
            <div className='flex relative items-center'>
              <ArraySelect
              defaultValue={editData?.tools_ru}
                classList='!w-[500px]'
                placeholder="Комплектация"
                options={toolRu.length > 0 ? toolRu : [{ value: '1', label: '1' }]}
              />
            </div>
          </Form.Item>
          <Form.Item
          initialValue={editData?.tools_uz}
            className="!mb-[5px]"
            name="Комплектация на узбекском"
          >
            <div className='flex relative items-center'>
              <ArraySelect
              defaultValue={editData?.tools_uz}
                classList='!w-[500px]'
                placeholder="Комплектация на узбекском"
                options={toolUz.length > 0 ? toolUz : [{ value: '1', label: '1' }]}
              />
            </div>
          </Form.Item>
        </div>
      </div>
      <Form.Item className="!mb-[5px] flex items-center justify-center">
        <Button type='submit' classList='!rounded-[25px] !text-[18px] !py-[2px] mt-[3px] !px-[40px]'>Добавить</Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;