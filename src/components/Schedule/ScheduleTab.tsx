import { FC } from 'react'

interface IScheduleTab {
  onChange: () => void
  checked: boolean
  label: string
  id: string
}

const ScheduleTab: FC<IScheduleTab> = ({ onChange, checked, label, id }) => {
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
        className='dark:peer-checked:bg-neutral-700 block cursor-pointer select-none rounded-md p-1 transition-background peer-checked:bg-gray-200/60'
      >
        {label}
      </label>
    </div>
  )
}

export default ScheduleTab
