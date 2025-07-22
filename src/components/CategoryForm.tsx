import { Button } from "../components";
import toast from "react-hot-toast";
import { useContext, useState, type FormEvent } from "react";
import { patchRequest, postRequest } from "../service/getRequest";
import { Context } from "../context/Context";
import { Form, Input } from "antd";
import { CreateCategory } from "../assets/icon";

const CategoryForm = ({
  setState,
  item,
}: {
  setState?: React.Dispatch<React.SetStateAction<boolean>>,
  item: {
    url: string;
    method: string;
    inputs: { label: string; name: string; value?: string }[];
  };
}) => {
  const [data, setData] = useState(
    Object.fromEntries(item.inputs.map((el) => [el.name, el.value || ""]))
  );
  let {token} = useContext(Context)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (item.method === "POST") {
        await postRequest(item.url, data, token=token);
        toast.success("Успешно добавлено");
      } else {
        await patchRequest(item.url, data, token=token);
        toast.success("Успешно обновлено");
      }
      setState && setState(false);
    } catch (err: any) {
      toast.error(err?.message || "Ошибка при сохранении");
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="px-[60px] flex flex-col items-center gap-[100px]"
>
  <div className="grid grid-cols-2   justify-center gap-x-[100px] gap-y-[100px]">
    {item.inputs.map((input, idx) => (
      <div key={idx} className="flex flex-col gap-[8px] items-center">
        <Form.Item
          rules={[{ required: true, message: `Please fill this input` }]}
          className="!mb-[5px] w-full flex flex-col items-center"
          label={input.label}
          required
          tooltip={input.label}
        >
          <div className="relative flex items-center">
            <div className="absolute left-[-35px]">
              <CreateCategory />
            </div>
            <Input
              onChange={(e) =>
                setData((prev) => ({ ...prev, [input.name]: e.target.value }))
              }
              defaultValue={data[input.name]} 
              className="!rounded-none !w-[300px] !text-[20px] !border-l-[0px] !border-r-[0px] !border-t-[0px] !border-b-[#545454]"
              type="text"
            />
          </div>
        </Form.Item>
      </div>
    ))}
  </div>
  <Button
    type="submit"
    classList="w-[250px] rounded-[50px] !text-[18px] font-bold !py-[15px]"
  >
    {item.method === "POST" ? "Добавить" : "Изменить"}
  </Button>
</form>

  );
};

export default CategoryForm;
