import { Text } from "../components";

interface CustomTableProps {
  headers: any[]; 
  widths: number[];
  classList?: string
}

const CustomTable = ({ headers, widths, classList }: CustomTableProps) => {
  return (
    <div className={`flex rounded-[30px] bg-[#FFFFFF] py-[17px] px-[50px] ${classList}`}>
      {headers.map((header, index) => (
        <div key={header} className={`w-[${widths[index]}%] flex items-center`}>
          <Text classList="!text-black">{header}</Text>
        </div>
      ))}
    </div>
  );
};

export default CustomTable;