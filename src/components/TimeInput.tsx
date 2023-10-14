import clsx from 'clsx'
import { FC, InputHTMLAttributes } from 'react'

type TimeInputProps = InputHTMLAttributes<HTMLInputElement>

const TimeInput: FC<TimeInputProps> = ({ className, ...props }) => {
  return (
    <input
      type='time'
      className={clsx(
        'max-w-max rounded-md bg-gray-200 p-1 text-sm dark:bg-neutral-700',
        className
      )}
      {...props}
    />
  )
}

export default TimeInput
