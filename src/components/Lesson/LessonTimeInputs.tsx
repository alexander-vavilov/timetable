import { FC, Dispatch, SetStateAction } from 'react'
import Input from '../Input'
import { addMinutes, format, parse } from 'date-fns'

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
  const changeStartTime = (value: string) => {
    const startTimeDate = parse(value, 'HH:mm', new Date())
    const endTimeDate = addMinutes(startTimeDate, 45)
    const endTimeValue = format(endTimeDate, 'HH:mm')

    setTime({ start: value, end: endTimeValue })
  }

  const changeEndTime = (value: string) => {
    setTime((prevTime) => ({ ...prevTime, end: value }))
  }

  return (
    <div className='flex max-w-[140px] flex-col gap-2'>
      <div className='flex justify-between gap-2'>
        <span>Начало: </span>
        <Input
          type='time'
          editable={isEditable}
          styleVariant='time'
          value={time.start}
          onChange={(e) => changeStartTime(e.target.value)}
        />
      </div>
      <div className='flex justify-between gap-2'>
        <span>Конец: </span>
        <Input
          type='time'
          editable={isEditable}
          styleVariant='time'
          value={time.end}
          onChange={(e) => changeEndTime(e.target.value)}
        />
      </div>
    </div>
  )
}

export default LessonTimeInputs
