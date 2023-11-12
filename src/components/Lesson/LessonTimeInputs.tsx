import { FC, Dispatch, SetStateAction } from 'react'
import Input from '../Input'

type timeType = { start: string; end: string }
interface LessonTimeInputsProps {
  time: timeType
  setTime: Dispatch<SetStateAction<timeType>>
  isEditable: boolean
}

const LessonTimeInputs: FC<LessonTimeInputsProps> = ({
  time,
  setTime,
  isEditable
}) => {
  return (
    <div className='flex max-w-[140px] flex-col gap-2'>
      <div className='flex justify-between gap-2'>
        <span>Начало: </span>
        <Input
          type='time'
          editable={isEditable}
          styleVariant='time'
          value={time.start}
          onChange={(e) =>
            setTime((prevTime) => ({
              ...prevTime,
              start: e.target.value
            }))
          }
        />
      </div>
      <div className='flex justify-between gap-2'>
        <span>Конец: </span>
        <Input
          type='time'
          editable={isEditable}
          styleVariant='time'
          value={time.end}
          onChange={(e) =>
            setTime((prevTime) => ({
              ...prevTime,
              end: e.target.value
            }))
          }
        />
      </div>
    </div>
  )
}

export default LessonTimeInputs
