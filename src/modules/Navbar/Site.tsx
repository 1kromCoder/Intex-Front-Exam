import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Context } from "../../context/Context";
import type { SiteType } from "../../types/SiteType";
import { getRequest } from "../../service/getRequest";
import SiteCard from "../../components/Cards/SiteCard";
import CreateCategory from "../../components/CreateCategory";

const fieldGroups: {
  [key: string]: {
    label: string;
    fields: { label: string; name: keyof SiteType }[];
  };
} = {
  phone: {
    label: "Телефонный номер",
    fields: [{ label: "Номер", name: "phone" }],
  },
  address: {
    label: "Адрес",
    fields: [
      { label: "Название", name: "address_ru" },
      { label: "На узбекском", name: "address_uz" },
    ],
  },
  work_time: {
    label: "Рабочее время",
    fields: [
      { label: "Название", name: "work_time_ru" },
      { label: "На узбекском", name: "work_time_uz" },
    ],
  },
  telegram: {
    label: "Телеграм",
    fields: [{ label: "Ссылка", name: "telegram" }],
  },
  instagram: {
    label: "Инстаграм",
    fields: [{ label: "Ссылка", name: "instagram" }],
  },
};

const Site = () => {
  const { token } = useContext(Context);
  const [edit, setEdit] = useState<{
    inputs: { label: string; name: keyof SiteType }[];
    url: string;
    method: "PATCH";
    heading: string;
  } | null>(null);

  const {
    data: siteData,
    isError,
    error,
  } = useQuery({
    queryKey: ["site"],
    queryFn: () => getRequest("/site", token),
    refetchInterval: 1000,
  });

  if (isError) {
    toast.error((error as Error)?.message || "Произошла ошибка");
  }

  console.log(siteData);
  
  return (
    <div className="py-[22px] px-[42px]">
      <div className="mt-[70px]">
        {siteData && <SiteCard site={siteData} />}
      </div>
      {edit && (
        <CreateCategory
          inputs={edit.inputs}
          url={edit.url}
          method={edit.method}
          heading={edit.heading}
          setCreate={() => setEdit(null)}
        />
      )}
    </div>
  );
};

export default Site;
