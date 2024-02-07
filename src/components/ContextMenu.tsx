import { forwardRef } from 'react'

import { useClickAway } from '../hooks/useClickAway'
import useForwardRef from '../hooks/useForwardRef'
import { IMenu } from '../types/menu'
import Menu from './Menu/Menu'
import ModalPortal from './Modal/ModalPortal'

interface ContextMenuProps extends IMenu {
  isOpen: boolean
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ isOpen, items, handleClose }, ref) => {
    const innerRef = useForwardRef(ref)

    useClickAway(handleClose, innerRef)

    return (
      isOpen && (
        <ModalPortal
          onRequestClose={handleClose}
          className={{ overlay: 'bg-transparent' }}
        >
          <div ref={innerRef} className="absolute">
            <Menu items={items} handleClose={handleClose} />
          </div>
        </ModalPortal>
      )
    )
  }
)

export default ContextMenu
