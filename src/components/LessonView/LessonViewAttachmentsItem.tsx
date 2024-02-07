import { FC } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  MdDeleteOutline,
  MdOpenInBrowser,
  MdOutlineFileDownload
} from 'react-icons/md'

import useContextMenu from '../../hooks/useContextMenu'
import { MenuItem } from '../../types/menu'
import { cn } from '../../utils'
import ContextMenu from '../ContextMenu'
import Image from '../Image'

interface LessonViewAttachmentsItemProps {
  fileURL: string
  handleOpen: () => void
}

const LessonViewAttachmentsItem: FC<LessonViewAttachmentsItemProps> = ({
  fileURL,
  handleOpen
}) => {
  const {
    ref,
    open: openContextMenu,
    close: closeContextMenu,
    isOpen: isContextMenuOpen
  } = useContextMenu()

  const menuItems: MenuItem[] = [
    {
      label: 'Открыть',
      icon: MdOpenInBrowser,
      action: () => handleOpen()
    },
    {
      label: 'Сохранить',
      icon: MdOutlineFileDownload,
      action: () => window.open(fileURL)
    },
    {
      label: 'Удалить',
      icon: MdDeleteOutline,
      action: () => {},
      warning: {
        commitLabel: 'удалить',
        message: 'fjsdklfsd',
        title: 'AAAAAAA'
      }
    }
  ]

  return (
    <>
      <div onContextMenu={openContextMenu} className="group relative">
        <Image src={fileURL} onClick={handleOpen} />
        <button
          onClick={openContextMenu}
          className={cn(
            'image-button absolute right-0.5 top-0.5 p-1',
            !isContextMenuOpen &&
              'cursor:invisible cursor:opacity-0 cursor:group-hover:visible cursor:group-hover:opacity-100'
          )}
        >
          <BsThreeDotsVertical size={18} />
        </button>
      </div>
      <ContextMenu
        ref={ref}
        items={menuItems}
        handleClose={closeContextMenu}
        isOpen={isContextMenuOpen}
      />
    </>
  )
}

export default LessonViewAttachmentsItem
