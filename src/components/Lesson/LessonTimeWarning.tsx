import { FC } from 'react'

const LessonTimeWarning: FC = () => {
  return (
    <div className='text-red-400'>
      Время окончания не может быть меньше времени начала
    </div>
  )
}

export default LessonTimeWarning
