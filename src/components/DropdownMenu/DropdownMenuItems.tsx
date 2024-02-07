import { FC } from 'react'
import { IconType } from 'react-icons'

import { cn } from '../../utils'
import MenuItem from './DropdownMenuItem'

type menuItem = {
  label: string
  icon: IconType
  handler: () => void
  warning?: boolean
  permissions?: boolean
}

interface DropdownMenuItemsProps {
  handleClose: () => void
  items: menuItem[]
  styleVariant?: 'standard' | 'shrink'
}

const DropdownMenuItems: FC<DropdownMenuItemsProps> = ({
  handleClose,
  items,
  styleVariant = 'standard'
}) => {
  return (
    <ul
      className={cn(
        'flex max-h-[278px] w-full max-w-[18rem] flex-col overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none',
        {
          'p-2': styleVariant === 'standard',
          'p-1': styleVariant === 'shrink'
        }
      )}
    >
      {items.map(({ ...props }) => (
        <MenuItem
          key={props.label}
          handleClose={handleClose}
          styleVariant={styleVariant}
          {...props}
        />
      ))}
    </ul>
  )
}

export default DropdownMenuItems
