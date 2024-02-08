import { FC } from 'react'

import { MenuProps } from '../../types/menu'
import { cn } from '../../utils'
import MenuItem from './MenuItem'

const Menu: FC<MenuProps> = ({
  items,
  onRequestClose,
  variant = 'default'
}) => {
  return (
    <ul
      className={cn(
        'w- flex flex-col border border-gray-300 bg-gray-200 shadow-lg dark:border-neutral-800 dark:bg-neutral-900',
        {
          'rounded-md p-2': variant === 'default',
          'w-40 rounded-[4px] p-1': variant === 'shrink'
        }
      )}
    >
      {items.map(({ ...props }) => (
        <MenuItem
          key={props.label}
          onRequestClose={onRequestClose}
          variant={variant}
          {...props}
        />
      ))}
    </ul>
  )
}

export default Menu
