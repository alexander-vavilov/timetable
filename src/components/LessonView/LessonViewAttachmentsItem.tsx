import { ref } from 'firebase/storage'
import { FC } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  MdDeleteOutline,
  MdOpenInBrowser,
  MdOutlineFileDownload
} from 'react-icons/md'

import { storage } from '../../../firebase'
import useContextMenu from '../../hooks/useContextMenu'
import useFirebaseStorage from '../../hooks/useFirebaseStorage'
import { firebaseFile } from '../../types'
import { MenuItem } from '../../types/menu'
import { cn } from '../../utils'
import ContextMenu from '../ContextMenu'
import Image from '../Image'

interface LessonViewAttachmentsItemProps {
  file: firebaseFile
  handleOpen: () => void
}

const LessonViewAttachmentsItem: FC<LessonViewAttachmentsItemProps> = ({
  file,
  handleOpen
}) => {
  const {
    ref: contextMenuRef,
    open: openContextMenu,
    close: closeContextMenu,
    isOpen: isContextMenuOpen
  } = useContextMenu()

  const { deleteFile } = useFirebaseStorage()

  const menuItems: MenuItem[] = [
    {
      label: 'Открыть',
      icon: MdOpenInBrowser,
      action: () => handleOpen()
    },
    {
      label: 'Сохранить',
      icon: MdOutlineFileDownload,
      action: () => window.open(file.url)
    },
    {
      label: 'Удалить',
      icon: MdDeleteOutline,
      action: () => deleteFile(ref(storage, file.fullPath)),
      warning: {
        name: 'Удалить изображение',
        message: 'Вы уверены, что хотите удалить данное изображение?',
        confirmLabel: 'удалить'
      }
    }
  ]

  return (
    <>
      <div onContextMenu={openContextMenu} className="group relative">
        <Image src={file.url} onClick={handleOpen} />
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
        ref={contextMenuRef}
        items={menuItems}
        onRequestClose={closeContextMenu}
        isOpen={isContextMenuOpen}
      />
    </>
  )
}

export default LessonViewAttachmentsItem
