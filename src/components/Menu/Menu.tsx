import { FC } from 'react'

import { MenuProps } from '../../types/menu'
import { cn } from '../../utils'
import MenuItem from './MenuItem'

const styles = {
  default: 'rounded-md p-2',
  shrink: 'w-40 rounded-[4px] p-1'
}

const Menu: FC<MenuProps> = ({
  items,
  onRequestClose,
  variant = 'default'
}) => {
  return (
    <ul
      className={cn(
        'flex flex-col border border-gray-300 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900',
        styles[variant]
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
