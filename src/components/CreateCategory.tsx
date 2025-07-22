import { CloseOutlined } from "@ant-design/icons";
import { Heading } from "../components";
import CategoryForm from "./CategoryForm";

const CreateCategory = ({
  setCreate,
  heading,
  inputs,
  url,
  method,
}: {
  url: string;
  method: string;
  heading: string;
  inputs: { label: string; name: string; value?: string }[];
  setCreate: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div className="fixed z-[11] inset-0 backdrop-filter bg-black/40 backdrop-blur-[4px] flex items-center justify-center">
      <div className="w-[1000px] h-[420px] relative rounded-[20px] bg-[#F8F8F8] flex flex-col pt-[10px] gap-[10px]">
        <Heading tag="h2" classList="flex items-start mt-[40px] justify-center">
          {heading}
        </Heading>
        <div className="absolute top-[20px] right-[30px] cursor-pointer">
          <CloseOutlined
            onClick={() => setCreate(false)}
            className="!text-[25px] !text-[#B9B9B9]"
          />
        </div>
        <div className="mt-[50px]">
          <CategoryForm setState={setCreate} item={{ url, method, inputs }} />
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
