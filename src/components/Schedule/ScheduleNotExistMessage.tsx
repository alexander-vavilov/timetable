import { FC } from 'react'
import { ReactSVG } from 'react-svg'
import CatSvg from '../../assets/crying-cat.svg'

const ScheduleNotExistMessage: FC = () => {
  return (
    <div className='flex max-w-sm flex-col items-center text-center'>
      <ReactSVG src={CatSvg} className='w-40 md:w-60' />
      <span className='sm:text-lg'>
        Похоже, что данное расписание либо пустое, либо не существует
      </span>
    </div>
  )
}

export default ScheduleNotExistMessage
