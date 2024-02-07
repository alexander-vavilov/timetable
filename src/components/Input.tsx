import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  InputHTMLAttributes
} from 'react'

import { cn } from '../utils'

export type InputProps = {
  type?: HTMLInputTypeAttribute
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  styleVariant?: 'outline' | 'flushed' | 'time'
  className?: string
  editable?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const defaultStyles =
  'peer w-full bg-transparent input focus:border-gray-500 disabled:text-white focus:dark:border-neutral-200'

const styles = {
  outline: cn(defaultStyles, 'rounded-md border'),
  flushed: cn(defaultStyles, 'rounded-none border-b'),
  time: 'max-w-max rounded-md bg-gray-200 p-1 text-sm dark:bg-neutral-700'
}

const Input: FC<InputProps> = ({
  styleVariant = 'outline',
  value,
  placeholder,
  className,
  onChange,
  editable = true,
  ...props
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editable) onChange(e)
  }

  return (
    <div className="relative">
      <input
        readOnly={!editable}
        disabled={!editable}
        value={value}
        onChange={handleInputChange}
        className={cn(styles[styleVariant], className)}
        {...props}
      />
      {placeholder && (
        <label
          className={cn(
            'pointer-events-none absolute left-1 -translate-y-1/2 bg-white px-1 capitalize leading-none transition-all duration-200 dark:bg-neutral-800',
            {
              'top-0 dark:text-neutral-100': !!value.length,
              'top-1/2 peer-focus:top-0 dark:text-neutral-300 peer-focus:dark:text-neutral-100':
                !value.length
            }
          )}
        >
          {placeholder}
        </label>
      )}
    </div>
  )
}

export default Input
