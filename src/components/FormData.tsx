import { useContext, useState } from 'react';
import { Form, Input, Tag } from 'antd';
import { CountIcon, PriceIcon, RamkaIcon, RazmerIcon, StatusIcon } from '../assets/icon';
import CustomSelect from './CustomSelect';
import Button from './Button';
import ArraySelect from './CustomArraySelect';
import { postRequest } from "../service/getRequest";
import toast from 'react-hot-toast';
import { Context } from '../context/Context';
import axios from 'axios';
import { API } from '../service/getEnv';

type RequiredMark = boolean | 'optional' | 'customize';

const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
    {label}
  </>
);

const FormDatas = ({ category, categoryData, toolRu, toolUz, file, setCreate }: {setCreate?: React.Dispatch<React.SetStateAction<boolean>>, file:File | null, toolRu: any[], toolUz: any[], category: string, categoryData: any }) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
  const {toolsRU, toolsUz, token} = useContext(Context)
  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  async function handleSubmit(values: any) {
    try {
      if (!file) {
  toast.error("Please select a file first.");
  return;
}

      const formData = new FormData();
formData.append("file", file);


const filename = await axios.post(`${API}/file`, formData, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

      const payload = {
        image: filename.data.filename || '346475b589c5514cb392c1294aed5c93.png',
        categoryId: values.cateogry,
        price: Number(values['Стартовая цена (сум)']),
        count: Number(values['Количество']),
        discountedPrice: Number(values['Цена со скидкой (сум)']),
        frame_ru: values['Рамка'],
        frame_uz: values['Рамка на узбекском'],
        size: values['Размер (м)'],
        depth: Number(values['Глубина (см)']),
        status: values.status,
        tools_ru: toolsRU || [],
        tools_uz: toolsUz || []
      };

      console.log('Payload:', payload);
      await postRequest('/product', payload, token);
      toast.success('Product created successfully!');
      // @ts-ignore
      setCreate(false);
      form.resetFields();
    } catch (err: any) {
      toast.error(err?.message || 'An error occurred');
    }
  }

  const initialValues = {
    requiredMarkValue: requiredMark,
    cateogry: categoryData?.length > 0 ? categoryData.find((item: any) => item.title === category)?.id : undefined,
    status: 'Рекомендуем',
    Комплектация: [], // Empty array as default
    'Комплектация на узбекском': [], // Empty array as default
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
  name="cateogry"
  label="Категория"
  rules={[{ required: true, message: 'Выберите категорию' }]}
>
  <CustomSelect
    selectData={categoryData.map((item: any) => ({
      value: item.id,
      label: item.title,
    }))}
  />
</Form.Item>
            <Form.Item
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
                  className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='number'
                />
              </div>
            </Form.Item>
            <Form.Item
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
                  className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
            <Form.Item
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
                  className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
            <Form.Item
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
                  className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='number'
                />
              </div>
            </Form.Item>
            <Form.Item
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
                  className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='number'
                />
              </div>
            </Form.Item>
            <Form.Item
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
                  className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
            <Form.Item
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
                  className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]'
                  type='text'
                />
              </div>
            </Form.Item>
          </div>
        </div>
        <div>
          <Form.Item
            className="!mb-[5px]"
            name="Комплектация"
          >
            <div className='flex relative items-center'>
              <ArraySelect
                classList='!w-[500px]'
                placeholder="Комплектация"
                options={toolRu.length > 0 ? toolRu : [{ value: '1', label: '1' }]}
              />
            </div>
          </Form.Item>
          <Form.Item
            className="!mb-[5px]"
            name="Комплектация на узбекском"
          >
            <div className='flex relative items-center'>
              <ArraySelect
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

export default FormDatas;