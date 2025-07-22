import { useState } from "react";
import type { SiteType } from "../../types/SiteType";
import CreateCategory from "../CreateCategory";
import { EditIcon } from "../../assets/icon";

const SiteCard = ({ site }: { site: SiteType }) => {
  const [edit, setEdit] = useState<any>(false);
  console.log(site);
  
  const inputs = [
    { label: "Телефонный номер", name: "phone", value: site.phone },
    {
      label: "Адрес",
      name: "address",
      ru: site.address_ru,
      uz: site.address_uz,
    },
    {
      label: "Рабочее время",
      name: "work_time",
      ru: site.work_time_ru,
      uz: site.work_time_uz,
    },
    { label: "Телеграм", name: "telegram", value: site.telegram },
    { label: "Инстаграм", name: "instagram", value: site.instagram },
  ];

  return (
    <div className="space-y-[20px]">
      {inputs.map((input, idx) => (
        <div key={idx} className="flex items-center rounded-[30px] bg-white px-[50px] py-[20px] text-[20px]">
          <span className="w-[35%]">{input.label}</span>
          <span className="w-[70%]">
            {input.name === "address" ? site.address_ru : input.name === "work_time" ? site.work_time_ru : input.value}
          </span>
          <div className="cursor-pointer hover:scale-[1.1]" onClick={() => setEdit(input)}>
            <EditIcon/>
          </div>
        </div>
      ))}

      {edit && (
        <CreateCategory
          heading={`Изменить ${edit.label.toLowerCase()}`}
          setCreate={setEdit}
          method="PATCH"
          url={`/site`}
          inputs={edit.name === "address" || edit.name === "work_time"? [{  label: `${edit.label} RU`,  name: `${edit.name}_ru`,  value: edit.ru,},{  label: `${edit.label} UZ`,  name: `${edit.name}_uz`,  value: edit.uz,},]: [{  label: edit.label,  name: edit.name,  value: edit.value,},]}
        />
      )}
    </div>
  );
};

export default SiteCard;
