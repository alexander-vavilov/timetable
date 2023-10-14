import { FC } from 'react'
import { InputType } from '../types'
import clsx from 'clsx'
import TimeInput from './TimeInput'

const Input: FC<InputType> = ({
  styleVariant = 'outline',
  placeholder,
  className,
  ...props
}) => {
  const outlineInputClasses = 'rounded-md border-2'
  const flushedInputClasses = 'rounded-none border-b-2'

  const commonInputClasses =
    'peer w-full border-gray-200 bg-transparent px-2 py-1 transition-colors duration-300 focus:border-gray-500 disabled:text-white dark:border-neutral-500 focus:dark:border-neutral-200'
  const inputClasses = clsx(
    commonInputClasses,
    styleVariant === 'outline' ? outlineInputClasses : flushedInputClasses,
    className
  )

  if (props.type === 'time') return <TimeInput {...props} />

  return (
    <div className='relative'>
      <input className={inputClasses} {...props} />
      {placeholder && (
        <label
          className={clsx(
            'pointer-events-none absolute left-1 -translate-y-1/2 bg-white px-1 capitalize leading-none transition-all duration-200 dark:bg-neutral-800',
            props.value?.length
              ? 'top-0 dark:text-neutral-100'
              : 'top-1/2 peer-focus:top-0 dark:text-neutral-300 peer-focus:dark:text-neutral-100'
          )}
        >
          {placeholder}
        </label>
      )}
    </div>
  )
}

export default Input
