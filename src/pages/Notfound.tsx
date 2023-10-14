import { FC } from 'react'
import { ReactSVG } from 'react-svg'
import CatSvg from '../assets/sad-cat.svg'

const Notfound: FC = () => {
  return (
    <div className='flex h-d-screen w-full flex-col items-center justify-center bg-gray-200 transition-background dark:bg-neutral-950'>
      <div className='flex select-none items-center'>
        <span className='text-7xl font-medium md:text-9xl'>4</span>
        <ReactSVG src={CatSvg} className='w-40 md:w-60' />
        <span className='text-7xl font-medium md:text-9xl'>4</span>
      </div>
      <span className='text-center text-xl !leading-4 md:text-2xl'>
        Страница не найдена
      </span>
    </div>
  )
}

export default Notfound
