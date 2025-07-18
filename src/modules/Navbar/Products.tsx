import { useState } from "react"
import { DeleteIcon, EditIcon, SearchIcon } from "../../assets/icon"
import Button from "../../components/Button"
import PageCaption from "../../components/PageCaption"
import Text from "../../components/Text"
import basseyn from "../../assets/images/basseyn.png"

const Products = () => {
  const [active, setActive] = useState<string>("Каркасные")
  const pageDatas = [
    {id: 1,title: "Каркасные"},
    {id: 2,title: "Надувные"}
  ]
  return (
    <div className="py-[22px] px-[42px] space-y-[40px]">
      <div className="flex justify-between">
        <div className="bg-[#fff] w-[370px] h-[64px] rounded-[30px] flex items-center justify-between px-[24px]">
          <input placeholder="Найти" className="outline-none text-[20px]"/>
          <Text classList="!text-[30px]">|</Text>
          <button className="cursor-pointer"><SearchIcon/></button>
        </div>
        <Button classList="rounded-[50px] !text-[20px] !font-bold !py-[15px]">+ Добавить Продукт</Button>
      </div>
    <div>
      <PageCaption active={active} setActive={setActive} pages={pageDatas}/>
    </div>
    <div className="space-y-[20px]">
      <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px]">
        <Text classList="w-[16%] !text-black">Изображение</Text>
        <Text classList="w-[17%] !text-black">Цена(сум)</Text>
        <Text classList="w-[15%] !text-black">Количество</Text>
        <Text classList="w-[17%] !text-black">Рамка</Text>
        <Text classList="w-[15%] !text-black">Размер(м)</Text>
        <Text classList="w-[15%] !text-black">Глубина(см)</Text>
        <Text classList="w-[15%] !text-black">Действия</Text>
      </div>
      {active == "Каркасные" && (
        <>
        <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px] overflow-auto">
          <div className="w-[14%] flex items-center">
            <img  src={basseyn} alt="" />
          </div>
          <div className="w-[20%]">
            <div className="relative">
              <Text>1.800.000 сум</Text>
              <div className="absolute w-[85px] bg-red-500 h-[1px] z-10 top-[15px] rotate-[8deg]"></div>
            </div>
            <Text classList="!font-bold !text-black">1.520.000 сум</Text>
          </div>
          <div className="w-[10%] flex items-center"><Text classList="!text-black">3</Text></div>
          <div className="w-[18%] flex items-center"><Text classList="!text-black">Рамка призмы</Text></div>
          <div className="w-[14%] flex items-center"><Text classList="!text-black">2 x 4</Text></div>
          <div className="w-[12%] flex items-center"><Text classList="!text-black">83</Text></div>
          <div className="flex gap-[10px] items-center">
            <EditIcon/>
            <DeleteIcon/>
          </div> 
        </div>
        <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px] overflow-auto">
          <div className="w-[14%] flex items-center">
            <img  src={basseyn} alt="" />
          </div>
          <div className="w-[20%]">
            <div className="relative">
              <Text>1.800.000 сум</Text>
              <div className="absolute w-[85px] bg-red-500 h-[1px] z-10 top-[15px] rotate-[8deg]"></div>
            </div>
            <Text classList="!font-bold !text-black">1.520.000 сум</Text>
          </div>
          <div className="w-[10%] flex items-center"><Text classList="!text-black">7</Text></div>
          <div className="w-[18%] flex items-center"><Text classList="!text-black">Прямоугольная</Text></div>
          <div className="w-[14%] flex items-center"><Text classList="!text-black">3.05 x 2.20</Text></div>
          <div className="w-[12%] flex items-center"><Text classList="!text-black">84</Text></div>
          <div className="flex gap-[10px] items-center">
            <EditIcon/>
            <DeleteIcon/>
          </div>
        </div>
        <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px] overflow-auto">
          <div className="w-[14%] flex items-center">
            <img  src={basseyn} alt="" />
          </div>
          <div className="w-[20%]">
            <div className="relative">
              <Text>1.800.000 сум</Text>
              <div className="absolute w-[85px] bg-red-500 h-[1px] z-10 top-[15px] rotate-[8deg]"></div>
            </div>
            <Text classList="!font-bold !text-black">1.520.000 сум</Text>
          </div>
          <div className="w-[10%] flex items-center"><Text classList="!text-black">10</Text></div>
          <div className="w-[18%] flex items-center"><Text classList="!text-black">Металлический</Text></div>
          <div className="w-[14%] flex items-center"><Text classList="!text-black">2,7</Text></div>
          <div className="w-[12%] flex items-center"><Text classList="!text-black">60</Text></div>
          <div className="flex gap-[10px] items-center">
            <EditIcon/>
            <DeleteIcon/>
          </div>
        </div>
        </>
      )}
      {active == "Надувные" && <div>Надувные</div>}
    </div>
    </div>
  )
}

export default Products