import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { DeleteIcon, OKIcon, SearchIcon } from "../../assets/icon";
import { PageCaption, Text } from "../../components";
import { getRequest } from "../../service/getRequest";
import { Context } from "../../context/Context";
import type { OrderType, ZakazType } from "../../types/ZakazType";
import type { ConsultType, KonsultType } from "../../types/KonsultType";
import ZakazCard from "../../components/Cards/ZakazCard";
import KonsultCard from "../../components/Cards/KonsultCard";
import { useContext } from "react";

const Zakaz = () => {
  const [active, setActive] = useState("Заказы");
  const { token } = useContext(Context);

  const {
    data: zakazData,
    isError: zakazError,
    error: zakazErrorObj,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getRequest("/order", token),
    refetchInterval: 10000,
  });

  const {
    data: konsultData,
    isError: konsultError,
    error: konsultErrorObj,
  } = useQuery({
    queryKey: ["consultations"],
    queryFn: () => getRequest("/consultation", token),
    refetchInterval: 10000,
  });

  if (zakazError) toast.error((zakazErrorObj as Error).message);
  if (konsultError) toast.error((konsultErrorObj as Error).message);

  const zakaz: ZakazType[] = zakazData?.data || [];
  const konsult: ConsultType[] = konsultData?.data || [];

  const pages = [
    { id: "1", title: "Заказы" },
    { id: "2", title: "Консультации" },
  ];

  return (
    <div className="py-[22px] px-[42px] space-y-[40px]">
      <div className="flex justify-between">
        <div className="bg-[#fff] w-[370px] h-[64px] rounded-[30px] flex items-center justify-between px-[24px]">
          <input placeholder="Найти" className="outline-none text-[20px]" />
          <Text classList="!text-[30px] !text-[#CCCCCC]">|</Text>
          <button className="cursor-pointer">
            <SearchIcon />
          </button>
        </div>
      </div>

      <PageCaption active={active} setActive={setActive} pages={pages} />

      <div className="space-y-[20px]">
        {active == "Заказы" && (
          <>
            <div className="flex rounded-[30px] bg-[#FFFFFF] items-center py-[5px] px-[30px]">
              <Text classList="!w-[19%]">Имя клиента</Text>
              <Text classList="!w-[15%]">Телефон</Text>
              <Text classList="!w-[20%]">Изображение</Text>
              <div className="!w-[15%] flex flex-col">
                <Text>Размер(м)/</Text>
                <Text>Глубина(см)</Text>
              </div>
              <Text classList="!w-[15%]">Цена(сум)</Text>
              <Text classList="!w-[15%]">Адрес</Text>
              <Text classList="!w-[15%]">Время</Text>
              <Text classList="!w-[15%]">Действия</Text>
            </div>
            {zakaz.map((item: ZakazType) => (
              <ZakazCard key={item.id} item={item} />
            ))}
          </>
        )}

        {active == "Консультации" && (
          <>
            <div className="flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px]">
              <Text classList="!w-[24%]">Имя клиента</Text>
              <Text classList="!w-[33%]">Телефон</Text>
              <Text classList="!w-[29%]">Время</Text>
              <Text classList="!w-[1%]">Действия</Text>
            </div>
            {konsult.map((item: ConsultType) => (
              <KonsultCard key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Zakaz;
