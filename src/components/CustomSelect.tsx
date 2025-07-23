import { Select } from 'antd';

const CustomSelect = ({
  selectData,
  classList,
  placeholder,
  defaultValue,
  ...rest
}: {
  selectData: { value: string; label: string }[];
  classList?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <Select
      className={classList}
      style={{ width: 300 }}
      defaultValue={defaultValue}
      showSearch
      placeholder={placeholder || 'Выбери категорию'}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={selectData}
      {...rest} // ⬅️ важно: это прокинет value/onChange из Form.Item
    />
  );
};

export default CustomSelect;
