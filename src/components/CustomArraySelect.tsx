import { Select, Space } from 'antd';
import { Context } from '../context/Context';
import { useContext } from 'react';

const ArraySelect = ({ options, classList, placeholder, value, onChange, defaultValue }: { defaultValue?: string[] | undefined, placeholder: string, options: { value: string; label: string }[], classList?: string, value?: string[], onChange?: (value: string[]) => void }) => {
  const formattedOptions = options.map((option) => ({
    value: typeof option === 'string' ? option : option.value,
    label: typeof option === 'string' ? option : option.label,
  }));

  const { setToolsRu, toolsRU, toolsUz, setToolsUz} = useContext(Context)
  
  return (
    <Space className={classList} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        defaultValue={defaultValue || []}
        placeholder={placeholder}
        value={value}
        onChange={(selectedValues) => {
  if (placeholder === "Комплектация") {
    setToolsRu(selectedValues)
  } else {
    setToolsUz(selectedValues);
  }
  onChange?.(selectedValues);
}}
        options={formattedOptions}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
    </Space>
  );
};

export default ArraySelect;