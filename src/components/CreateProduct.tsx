import { useContext, useEffect, useState } from "react";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ImageIcon } from "../assets/icon";
import { Text } from "../components";
import { Button } from "antd";
import { getRequest } from "../service/getRequest";
import { Context } from "../context/Context";
import FormDatas from "./FormData";
import type { ProductType } from "../types/ProductType";
import { useQuery } from "@tanstack/react-query";

const CreateProduct = ({
  setCreate,
  category,
  editData
}: {
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  editData?: ProductType
}) => {
  const [image, setImage] = useState<string | null>(null);
  const {token} = useContext(Context)
  const [toolsRu, setToolRu] = useState<any[]>([]);
  const [toolsUz, setToolUz] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<{ id: string, title: string }[]>([]);

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getRequest("/category", token),
    refetchInterval: 7000,
  });

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.data.map((item: any) => ({ id: item.id, title: item.name_ru })) || []);
    }
  }, [categoryData]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(e.target.files?.[0]);
        setImage(reader.result as string);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

    useEffect(() => {
    async function getData(){
      const toolRu = await getRequest("/enum/toolRu");
      const toolUz = await getRequest("/enum/toolUz");
      const toolOptionsRu = Object.keys(toolUz).map((key) => ({
        value: key,
        label: toolUz[key],
      }));
      const toolOptions = Object.keys(toolRu).map((key) => ({
        value: key,
        label: toolRu[key],
      }))
      setToolRu(toolOptions);
      setToolUz(toolOptionsRu);
    }
    getData();
  }, [token]);

  return (
    <div className="fixed z-[11] inset-0 backdrop-filter bg-black/40 backdrop-blur-[4px] flex items-center justify-center">
      <div className="w-[1000px] h-[97%] relative rounded-[20px] bg-[#F8F8F8] flex flex-col items-center justify-center pt-[10px] gap-[10px]">
        <div className="absolute top-[20px] right-[30px] cursor-pointer">
          <CloseOutlined onClick={() => setCreate(false)} className="!text-[25px] !text-[#B9B9B9]" />
        </div>

        <label
  className={`w-[600px] h-[300px] bg-[#FFFF] flex items-center justify-center cursor-pointer border-[2px] border-[#545454] border-dashed rounded-[20px] overflow-hidden relative ${
    image ? "group" : ""
  }`}
>
  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
  {image ? (
    <>
      <img src={image ? image : editData?.image} alt="Uploaded" className="w-[95%] h-[95%] object-contain" />
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Button type="default" className="!h-[50px]">
          <DeleteOutlined
            className="!text-[#898686cc] text-[30px] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDeleteImage();
            }}
          />
        </Button>
      </div>
    </>
  ) : (
    <div className="flex flex-col items-center">
      <ImageIcon />
      <Text classList="!text-[#898989] !pl-[30px]">Choose File</Text>
    </div>
  )}
</label>
        <div>
          <FormDatas file={file} toolRu={toolsRu} toolUz={toolsUz} categoryData={categories} category={category} />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;