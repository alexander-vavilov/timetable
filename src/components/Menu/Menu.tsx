import { FC } from 'react'

import { IMenu } from '../../types/menu'
import MenuItem from './MenuItem'

const Menu: FC<IMenu> = ({ items, handleClose }) => {
  return (
    <ul className="flex w-40 flex-col rounded-[4px] border border-gray-200 bg-neutral-900 p-1 shadow-lg dark:border-neutral-800">
      {items.map(({ ...props }) => (
        <MenuItem key={props.label} handleClose={handleClose} {...props} />
      ))}
    </ul>
  )
}

export default Menu
