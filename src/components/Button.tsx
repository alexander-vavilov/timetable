import clsx from 'clsx'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import Spinner from './Spinner'

interface ICommonProps {
  children: ReactNode
  className?: string
  isLoading?: boolean
}
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'button'
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button'
}
interface IRouteLink {
  variant: 'routeLink'
  to: string
}

type propsType = ICommonProps & (IButton | IRouteLink)

const Button: FC<propsType> = ({
  children,
  variant,
  className,
  isLoading,
  ...props
}) => {
  const defaultClasses =
    'relative rounded-md bg-green-700 px-2 py-1 overflow-hidden'

  return variant === 'button' ? (
    <button
      className={clsx(defaultClasses, className)}
      disabled={!!isLoading}
      {...props}
    >
      {children}
      {isLoading && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/20 dark:bg-black/50'>
          <Spinner width={20} height={20} />
        </div>
      )}
    </button>
  ) : (
    <Link className={clsx(defaultClasses, className)} {...(props as LinkProps)}>
      {children}
    </Link>
  )
}

export default Button
