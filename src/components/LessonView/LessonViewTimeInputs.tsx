import { addMinutes, format, parse } from 'date-fns'
import { Dispatch, FC, SetStateAction } from 'react'

import Input from '../Input'

type timeType = { start: string; end: string }
interface LessonViewTimeInputsProps {
  time: timeType
  setTime: Dispatch<SetStateAction<timeType>>
  editable: boolean
}

const LessonViewTimeInputs: FC<LessonViewTimeInputsProps> = ({
  time,
  setTime,
  editable
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

  const items = [
    {
      label: 'Начало',
      value: time.start,
      onChange: changeStartTime
    },
    {
      label: 'Конец',
      value: time.end,
      onChange: changeEndTime
    }
  ]

  return (
    <div className="flex max-w-[140px] flex-col gap-2">
      {items.map(({ label, value, onChange }) => (
        <div key={label} className="flex gap-2">
          <span>{label}: </span>
          <Input
            type="time"
            editable={editable}
            styleVariant="time"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}

export default LessonViewTimeInputs
