import { type Dispatch, type SetStateAction } from 'react'

const PageCaption = ({pages, setActive, active}: {pages: {id: number, title: string}[], active: string, setActive: Dispatch<SetStateAction<string>>} ) => {
  return (
    <div style={{width: `${100/pages.length}%`}} className='flex mx-auto text-[35px] gap-[40px]'>
        {pages.map((item: {id: number, title: string}) => (
            <button onClick={() => setActive(item.title)} className={`${active == item.title ? "underline text-[#009398]" : "text-[#A6A6A6]"} cursor-pointer`} key={item.id}>{item.title}</button>
        ))}
    </div>
  )
}

export default PageCaption