import { useContext, useEffect, useState } from "react";
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
  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageDatas, setPageData] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    async function getData() {

      try {
        let categories = await getRequest("/category");
        setPageData(categories.data.map((item: any) => {
          return { id: item.id, title: item.name_ru };
        }));
        const data = await getRequest("/product");
        setProducts(data.data);
        console.log("d");
        
      } catch (err:any) {
        toast.error(err?.message || "An error occurred");
      }
    }
    getData();
  }, [token]);
  
  const filteredProducts = products.filter((product) => product.category.name_ru === active);
  
  return (
    <div className="py-[22px] px-[42px] space-y-[40px]">
      <div className="flex justify-between">
        <div className="bg-[#fff] w-[370px] h-[64px] rounded-[30px] flex items-center justify-between px-[24px]">
          <input placeholder="Найти" className="outline-none text-[20px]" />
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
        {filteredProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
      </div>
      {create && <CreateProduct categories={pageDatas}  setCreate={setCreate} category={active} />}
    </div>
  );
};

export default Products;