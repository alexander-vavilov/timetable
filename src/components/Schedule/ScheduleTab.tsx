import { FC } from 'react'

interface ScheduleTabProps {
  onChange: () => void
  checked: boolean
  label: string
  id: string
}

const ScheduleTab: FC<ScheduleTabProps> = ({
  onChange,
  checked,
  label,
  id
}) => {
  return (
    <div>
      <input
        type='radio'
        name='week'
        id={id}
        className='peer hidden h-0 w-0 opacity-0'
        onChange={onChange}
        checked={checked}
      />
      <label
        htmlFor={id}
        className='block cursor-pointer select-none rounded-md p-1 transition-background peer-checked:bg-gray-200/60 dark:peer-checked:bg-neutral-700'
      >
        {label}
      </label>
    </div>
  )
}

export default ScheduleTab
