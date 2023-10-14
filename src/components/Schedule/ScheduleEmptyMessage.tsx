import { FC } from 'react'
import CatSVG from '../../assets/thoughtful-cat.svg'
import { ReactSVG } from 'react-svg'

const ScheduleEmptyMessage: FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <ReactSVG src={CatSVG} className='w-40 md:w-60' />
      <span className='text-center md:text-lg'>
        Похоже, что у вас еще нет расписания
      </span>
    </div>
  )
}

export default ScheduleEmptyMessage
