import { FC } from 'react'

import { IMenu } from '../../types/menu'
import MenuItem from './MenuItem'

const Menu: FC<IMenu> = ({ items, handleClose }) => {
  return (
    <ul className="flex w-40 flex-col rounded-[4px] border border-gray-300 bg-gray-200 p-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      {items.map(({ ...props }) => (
        <MenuItem key={props.label} handleClose={handleClose} {...props} />
      ))}
    </ul>
  )
}

export default Menu
