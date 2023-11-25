import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import Spinner from './Spinner'
import { cn } from '../utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(
        'button relative select-none overflow-hidden',
        isLoading && 'pointer-events-none',
        className
      )}
      disabled={!!isLoading}
      {...props}
    >
      {children}
      {isLoading && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/20 dark:bg-black/50'>
          <Spinner size={20} />
        </div>
      )}
    </button>
  )
}

export default Button
