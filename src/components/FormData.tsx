import React, { useState } from 'react';
import { Form, Input, Tag } from 'antd';
import { CategoryIcon, CountIcon, PriceIcon, RamkaIcon, RazmerIcon, StatusIcon } from '../assets/icon';
import CustomSelect from './CustomSelect';
import Button from './Button';

type RequiredMark = boolean | 'optional' | 'customize';

const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
    {label}
  </>
);  

const FormData = ({category, categoryData}: {category: string, categoryData: any}) => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ requiredMarkValue: requiredMark }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
    >
      <div>
        <div className='flex gap-[65px]'>
          <div>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]} className="!mb-[5px]" name={"cateogry"} label="Категории" required tooltip="Категория продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><CategoryIcon/></div>
                  <CustomSelect category={category} selectData={categoryData.map((item: any) => {return {value: item.id, label: item.title}})}/>
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]} className="!mb-[5px]"  label="Стартовая цена (сум)" required tooltip="Стартовая цуна продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><PriceIcon/></div>
                  <Input className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]' type='number' />
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]} className="!mb-[5px]" label="Рамка" required tooltip="Рамка продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><RamkaIcon/></div>
                  <Input className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]' type='text' />
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]} className="!mb-[5px]" label="Размер (м)" required tooltip="Размер продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><RazmerIcon/></div>
                  <Input className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]' type='text' />
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]} className="!mb-[5px]" name={"status"} label="Статус" required tooltip="Статус продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><StatusIcon/></div>
                  <CustomSelect selectData={[{value: '1', label: "Рекомендуем"}, {value: '2', label: "Нет_в_наличии"}, {value: '3', label: "Скидка"}]}/>
              </div>
            </Form.Item>
          </div>
          <div>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]}className="!mb-[5px]"  label="Количество" required tooltip="Количество продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><CountIcon/></div>
                  <Input className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]' type='number' />
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]}className="!mb-[5px]"  label="Цена со скидкой (сум) " required tooltip="Цена со скидкой (сум)  продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><PriceIcon/></div>
                  <Input className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]' type='number' />
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]}className="!mb-[5px]" label="Рамка на узбекском" required tooltip="Рамка на узбекском продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><RamkaIcon/></div>
                  <Input className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]' type='text' />
              </div>
            </Form.Item>
            <Form.Item rules={[{ required: true, message: `Please fill this input` }]}className="!mb-[5px]" label="Глубина (см)" required tooltip="Глубина продукта">
              <div className='flex relative items-center'>
                  <div className='absolute z-1 left-[-30px]'><RazmerIcon/></div>
                  <Input className='!rounded-none !w-[300px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]' type='text' />
              </div>
            </Form.Item>
          </div>
        </div>
        <div>
          <Form.Item rules={[{ required: true, message: `Please fill this input` }]} className="!mb-[5px]">
              <div className='flex relative items-center'>
                  <CustomSelect classList='!w-[500px]' placeholder={"Комплектация"} selectData={[{value: '1', label: "Лестница"}, {value: '2', label: "Тент"}, {value: '3', label: "Подстилка"},{value: '4', label: "Фильтр"}]}/>
              </div>
          </Form.Item>
          <Form.Item rules={[{ required: true, message: `Please fill this input` }]}name={""} className="!mb-[5px]">
              <div className='flex relative items-center'>
                  <CustomSelect classList='!w-[500px]' placeholder={"Комплектация на узбекском"} selectData={[{value: '1', label: "Narvon"}, {value: '2', label: "Ayvon"}, {value: '3', label: "Axlat"}, {value: "4", label: "Filtr"}]}/>
              </div>
            </Form.Item>
        </div>
      </div>
      <Form.Item rules={[{ required: true, message: `Please fill this input` }]}className="!mb-[5px] flex items-center justify-center">
        <Button classList='!rounded-[25px] !text-[18px] !py-[2px] mt-[3px] !px-[40px]'>Добавить</Button>
      </Form.Item>
    </Form>
  );
};

export default FormData;