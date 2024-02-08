import { FC, useRef, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

import { menuStyles } from '../../consts'
import { MenuItem as MenuItemProperties } from '../../types/menu'
import { cn } from '../../utils'
import WarningModal from '../Modals/WarningModal'
import Menu from './Menu'

interface MenuItemProps extends MenuItemProperties {
  onRequestClose: () => void
  variant: 'shrink' | 'default'
}

interface ISubMenuPosition {
  x: 'left' | 'right'
  y: 'top' | 'bottom'
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    label,
    icon: Icon,
    warning,
    action,
    subMenu,
    onRequestClose,
    variant = 'default'
  } = props

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const menuItemRef = useRef<HTMLLIElement>(null)
  const [subMenuPosition, setSubMenuPosition] = useState<ISubMenuPosition>({
    x: 'right',
    y: 'top'
  })

  const getSubMenuPosition = (): ISubMenuPosition => {
    const menuItem = menuItemRef.current
    if (!menuItem || !subMenu) return { x: 'right', y: 'top' }

    const menuItemRect = menuItem.getBoundingClientRect()
    const horizontalPosition =
      menuItemRect.width + 12 > window.innerWidth - menuItemRect.right
        ? 'left'
        : 'right'
    const verticalPosition =
      menuItemRect.height * subMenu?.length >
      window.innerHeight - menuItemRect.bottom
        ? 'top'
        : 'bottom'

    return { x: horizontalPosition, y: verticalPosition }
  }

  const openSubMenu = () => {
    if (!subMenu) return

    setIsSubMenuOpen(true)
    setSubMenuPosition(getSubMenuPosition())
  }
  const closeSubMenu = () => {
    if (!subMenu) return
    setIsSubMenuOpen(false)
  }

  const [isWarningOpen, setIsWarningOpen] = useState(false)

  const handleAction = () => {
    action && action()
    onRequestClose()
  }

  const handleClick = () => {
    if (subMenu) return
    if (warning) return setIsWarningOpen(true)

    handleAction()
  }

  const styles = menuStyles(!!warning)

  return (
    <>
      <li
        ref={menuItemRef}
        onMouseEnter={openSubMenu}
        onMouseLeave={closeSubMenu}
      >
        <div className="relative">
          {!!subMenu && isSubMenuOpen && (
            <div
              className={cn('peer absolute', {
                'top-0': subMenuPosition.y === 'bottom',
                'right-full pr-3': subMenuPosition.x === 'left',
                'bottom-0': subMenuPosition.y === 'top',
                'left-full pl-3': subMenuPosition.x === 'right'
              })}
            >
              <Menu items={subMenu} onRequestClose={onRequestClose} />
            </div>
          )}

          <button
            onClick={handleClick}
            className={cn(
              'flex w-full select-none items-center justify-between',
              styles.button[variant]
            )}
          >
            <div className="flex cursor-pointer items-center gap-2">
              <div className={styles.icon[variant]}>
                {Icon && <Icon size={variant === 'default' ? 20 : 18} />}
              </div>
              <span>{label}</span>
            </div>
            {!!subMenu && <IoIosArrowForward size={18} />}
          </button>
        </div>
      </li>
      {isWarningOpen && (
        <WarningModal
          name="Удалить"
          onRequestClose={() => setIsWarningOpen(false)}
          confirm={{
            action: handleAction,
            label: 'Удалить'
          }}
          message={warning?.message}
        />
      )}
    </>
  )
}

export default MenuItem
