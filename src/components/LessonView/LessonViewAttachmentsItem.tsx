import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { FC } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  MdDeleteOutline,
  MdOpenInBrowser,
  MdOutlineFileDownload
} from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { db, storage } from '../../../firebase'
import { useContextMenu } from '../../hooks/useContextMenu'
import { toastError } from '../../toast'
import { MenuItem } from '../../types/menu'
import { FirebaseFile } from '../../types/storage'
import { cn } from '../../utils'
import ContextMenu from '../ContextMenu'
import Image from '../Image'

interface LessonViewAttachmentsItemProps {
  file: FirebaseFile
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
  const { scheduleId, lessonId } = useParams()

  const deleteFile = () => {
    if (!scheduleId || !lessonId) throw Error('Неверный идентификатор.')

    try {
      deleteObject(ref(storage, file.fullPath))
      updateDoc(doc(db, 'schedules', scheduleId, 'lessons', lessonId), {
        files: arrayRemove(file)
      })

      toast.success('Изображение успешно удалено!')
    } catch (error) {
      toastError(error)
    }
  }

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
      action: deleteFile,
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
        <Image
          src={file.url}
          onClick={handleOpen}
          className={{ wrapper: 'w-full' }}
        />
        <button
          onClick={openContextMenu}
          className={cn(
            'image-button absolute right-1 top-1 p-[3px]',
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
