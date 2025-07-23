import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../service/getRequest";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import { Button, Text } from "../../components";
import type { CategoryType } from "../../types/CategoryType";
import CategoriesCard from "../../components/Cards/CategoriesCard";
import CreateCategory from "../../components/CreateCategory";

const Category = () => {
  const { token } = useContext(Context);
  const [create, setCreate] = useState<boolean>(false);
  const {
    data: categoryData,
    isError: categoryError,
    error: categoryErrorObj,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getRequest("/category", token),
    refetchInterval: 3000,
  });

  if (categoryError) toast.error((categoryErrorObj as Error).message);

  const category: CategoryType[] = categoryData?.data || [];

  return (
    <div className="py-[22px] px-[42px] space-y-[40px]">
      <div className="flex justify-between">
        <div></div>
        <Button onClick={() => setCreate(true)} classList="rounded-[50px] !text-[20px] !font-bold !py-[15px]">+ Добавить категории</Button>
      </div>
      <div className="flex rounded-[30px] bg-[#FFFFFF] items-center justify-between py-[17px] px-[50px]">
        <Text classList="!text-black">Название</Text>
        <Text classList="!text-black">На узбекском</Text>
        <Text classList="!text-black">Действия</Text>
      </div>
      <div className="space-y-[10px]">
        {category.map((item: CategoryType) => <CategoriesCard item={item} key={item.id} />)}
      </div>
      {create && <CreateCategory inputs={[{ label: "Название", name: "name_ru" }, { label: "На узбекском", name: "name_uz" }]} url="/category" method="POST" heading="Добавить категории" setCreate={setCreate} />}
    </div>
  );
};

export default Category;