import clsx from 'clsx'
import { FC, useState } from 'react'
import { IconType } from 'react-icons'
import WarningModal from '../WarningModal'

interface IMenuItem {
  label: string
  icon: IconType
  handler: () => void
  warning: boolean
  display: boolean
  handleCloseMenu: () => void
}

const MenuItem: FC<IMenuItem> = ({
  label,
  icon: Icon,
  handler,
  warning,
  display = true,
  handleCloseMenu
}) => {
  const [isWarningOpen, setIsWarningOpen] = useState(false)

  const handleClick = () => {
    if (warning) {
      setIsWarningOpen(true)
    } else {
      handler()
    }
    handleCloseMenu()
  }

  const handleCloseWarning = () => setIsWarningOpen(false)

  return (
    display && (
      <li
        className={clsx(
          'cursor-pointer rounded-md transition-background',
          warning
            ? 'hover:bg-red-400/10'
            : 'hover:bg-gray-200/50 dark:hover:bg-neutral-700/70'
        )}
      >
        <button
          onClick={handleClick}
          className={clsx('w-full p-2', warning && 'text-red-500')}
        >
          <div className='flex items-center gap-2'>
            <div
              className={clsx(
                'flex items-center justify-center rounded-full p-2 shadow-sm dark:shadow-none',
                warning
                  ? 'bg-red-400/20 text-red-500'
                  : 'bg-gray-300/50 text-gray-800 dark:bg-neutral-600 dark:text-white'
              )}
            >
              <Icon size={20} />
            </div>
            <span className='text-start'>{label}</span>
          </div>
        </button>
        {isWarningOpen && (
          <WarningModal
            handleClose={handleCloseWarning}
            name={label}
            confirmHandler={handler}
          />
        )}
      </li>
    )
  )
}

export default MenuItem
