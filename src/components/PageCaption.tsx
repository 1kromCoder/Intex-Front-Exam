import { type Dispatch, type SetStateAction } from 'react'

const PageCaption = ({pages, setActive, active}: {pages: {id: string, title: string}[], active: string, setActive: Dispatch<SetStateAction<string>>} ) => {
  return (
    <div style={{width: `${100/pages.length}%`}} className='flex !w-[40%] mx-auto text-[35px] gap-[40px]'>
        {pages.map((item: {id: string, title: string}) => (
            <button onClick={() => setActive(item.title)} className={`${active == item.title ? "border-b-[3px] border-b-[#009398] text-[#009398]" : "text-[#A6A6A6]"} font-semibold cursor-pointer`} key={item.id}>{item.title}</button>
        ))}
    </div>
  )
}

export default PageCaption