import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "../../assets/icon";
import { Button, PageCaption, ProductCard, Text } from "../../components";
import { getRequest } from "../../service/getRequest";
import CreateProduct from "../../components/CreateProduct";
import { Context } from "../../context/Context";
import toast from "react-hot-toast";
import type { ProductType } from "../../types/ProductType";

const Products = () => {
  const { token } = useContext(Context);
  const [active, setActive] = useState<string>("Каркасные");
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const {
    data: categoriesData,
    isError: categoriesError,
    error: categoriesErrorObj,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getRequest("/category", token),
    refetchInterval: 3000,
  });

  const {
    data: productsData,
    isError: productsError,
    error: productsErrorObj,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getRequest("/product", token),
    refetchInterval: 1000,
  });

  if (categoriesError) toast.error((categoriesErrorObj as Error).message);
  if (productsError) toast.error((productsErrorObj as Error).message);

  const pageDatas = categoriesData?.data.map((item: any) => ({
    id: item.id,
    title: item.name_ru,
  })) || [];

  const products: ProductType[] = productsData?.data || [];

  const filteredProducts = products.filter((product) => product.category.name_ru === active && product.frame_ru.toLowerCase().includes(search.toLowerCase()));

  console.log(filteredProducts);
  
  return (
    <div className="py-[22px] px-[42px] space-y-[40px]">
      <div className="flex justify-between">
        <div className="bg-[#fff] w-[370px] h-[64px] rounded-[30px] flex items-center justify-between px-[24px]">
          <input onChange={(e) => setSearch(e.target.value)} placeholder="Найти" className="outline-none text-[20px]" />
          <Text classList="!text-[30px]">|</Text>
          <button className="cursor-pointer">
            <SearchIcon />
          </button>
        </div>
        <Button
          onClick={() => setCreate(true)}
          classList="rounded-[50px] !text-[20px] !font-bold !py-[15px]"
        >
          + Добавить Продукт
        </Button>
      </div>
      <div>
        <PageCaption active={active} setActive={setActive} pages={pageDatas} />
      </div>  
      <div className="space-y-[20px]">
        <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px]">
          <Text classList="w-[18%] !text-black">Изображение</Text>
          <Text classList="w-[17%] !text-black">Цена(сум)</Text>
          <Text classList="w-[15%] !text-black">Количество</Text>
          <Text classList="w-[23%] pl-[2%] !text-black">Рамка</Text>
          <Text classList="w-[15%] pr-[2%] !text-black">Размер(м)</Text>
          <Text classList="w-[15%] !text-black">Глубина(см)</Text>
          <Text classList="w-[15%] !text-black">Действия</Text>
        </div>
        
      <div className="space-y-[20px] max-h-[calc(99vh-400px)] no-scrollbar overflow-y-auto pr-2">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
      </div>
      {create && <CreateProduct setCreate={setCreate} category={active} />}
    </div>
  );
};

export default Products;