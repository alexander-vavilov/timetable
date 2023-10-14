import { FC } from 'react'
import PrivateInput from '../PrivateInput'
import { onChangeLessonFn } from '../../types'
import { parse } from 'date-fns'
import LessonTimeWarning from './LessonTimeWarning'

interface ILessonTimeInputs {
  start: string
  end: string
  editable: boolean
  onChangeLesson: onChangeLessonFn
}

const LessonTimeInputs: FC<ILessonTimeInputs> = ({
  start,
  end,
  editable,
  onChangeLesson
}) => {
  const startDate = parse(start, 'HH:mm', new Date())
  const endDate = parse(end, 'HH:mm', new Date())

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <span>Начало:</span>
        <PrivateInput
          type='time'
          condition={editable}
          value={start}
          onChange={(e) => onChangeLesson('start', e.target.value)}
          min='6:00'
          max='18:00'
        />
      </div>
      <div className='flex gap-2'>
        <span>Конец:</span>
        <PrivateInput
          type='time'
          condition={editable}
          value={end}
          onChange={(e) => onChangeLesson('end', e.target.value)}
          min='6:00'
          max='18:00'
        />
      </div>
      {startDate > endDate && <LessonTimeWarning />}
    </div>
  )
}

export default LessonTimeInputs
