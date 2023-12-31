import { ForwardedRef, forwardRef } from 'react'
import { IconType } from 'react-icons'
import MenuItems from '../Menu/MenuItems'
import ReactModal from 'react-modal'

type itemType = {
  label: string
  icon: IconType
  handler: () => void
}

interface ContextMenuProps {
  items: itemType[]
  onRequestClose: () => void
}

const ContextMenu = (
  { items, onRequestClose }: ContextMenuProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <ReactModal
      isOpen
      className='z-20 h-full w-full bg-transparent'
      overlayClassName='bg-transparent'
    >
      <div
        ref={ref}
        className='absolute'
        onContextMenu={(e) => e.preventDefault()}
      >
        <MenuItems
          handleClose={() => console.log('close')}
          items={items}
          styleVariant='shrink'
        />
      </div>
    </ReactModal>
  )
}

export default forwardRef(ContextMenu)
