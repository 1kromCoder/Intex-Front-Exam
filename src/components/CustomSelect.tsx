import { Select } from 'antd';

const CustomSelect = ({ selectData, classList, placeholder, category }: { selectData: { value: string; label: string}[], classList?: string, placeholder?: string, category?: string}) => {
    let categoryId = category ? selectData.filter((item) => item.label == category)[0].label : selectData[0].label
    return (
    <Select
    className={classList}
      style={{ width: 300 }}
      defaultValue=  { placeholder ? undefined : categoryId}
      showSearch
      placeholder= {placeholder ? placeholder : "Выбери категорию"}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={selectData}
    />
  );
};

export default CustomSelect;
