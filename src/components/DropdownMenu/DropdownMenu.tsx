import { signOut } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { FC, useContext, useRef, useState } from 'react'
import {
  MdClose,
  MdDeleteOutline,
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineModeEditOutline,
  MdOutlineSchedule,
  MdOutlineScheduleSend
} from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { auth, db } from '../../../firebase'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext'
import { useClickAway } from '../../hooks/useClickAway'
import { useKeyDown } from '../../hooks/useKeyDown'
import { toastError } from '../../toast'
import {
  IScheduleContext,
  IThemeContext,
  IUserContext
} from '../../types/contexts'
import { cn } from '../../utils'
import Overlay from '../Overlay'
import DropdownMenuButton from './DropdownMenuButton'
import DropdownMenuItems from './DropdownMenuItems'

const DropdownMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleClose = () => setIsOpen(false)

  useClickAway(handleClose, ref)
  useKeyDown((e) => {
    e.key === 'Escape' && setIsOpen(false)
  })

  const { isOwner, isEditMode, setIsEditMode } = useContext(
    ScheduleContext
  ) as IScheduleContext
  const { theme, switchTheme } = useContext(ThemeContext) as IThemeContext
  const { currentUser } = useContext(UserContext) as IUserContext
  const { scheduleId } = useParams()

  const navigate = useNavigate()

  const handleDeleteSchedule = async () => {
    if (!scheduleId) throw new Error('Неизвестный идентификатор.')

    try {
      const docRef = doc(db, 'schedules', scheduleId)
      await deleteDoc(docRef)

      toast.success('Расписание успешно удалено!')
    } catch (error) {
      toastError(error)
    }
  }

  const items = [
    {
      label: `${theme === 'light' ? 'Темный' : 'Светлый'} режим`,
      icon: theme === 'light' ? MdOutlineDarkMode : MdOutlineLightMode,
      handler: switchTheme
    },
    {
      label: 'Режим редактирования',
      icon: isEditMode ? MdClose : MdOutlineModeEditOutline,
      handler: () => setIsEditMode((prevState) => !prevState),
      permissions: !!scheduleId && isOwner
    },
    {
      label: 'Создать свое расписание',
      icon: MdOutlineSchedule,
      handler: () => navigate(`/schedule/${currentUser?.uid}`),
      permissions: !isOwner
    },
    {
      label: 'Поделиться расписанием',
      icon: MdOutlineScheduleSend,
      handler: () => navigate(`/schedule/${scheduleId}/share`),
      permissions: !!scheduleId
    },
    {
      label: 'Выйти',
      icon: MdLogout,
      handler: () => signOut(auth)
    },
    {
      label: 'Удалить расписание',
      icon: MdDeleteOutline,
      handler: handleDeleteSchedule,
      warning: true,
      permissions: !!scheduleId && isOwner
    }
  ]

  return (
    <>
      <div ref={ref} className="z-10">
        <DropdownMenuButton
          onClick={() => setIsOpen((prevState) => !prevState)}
          isOpen={isOpen}
        />
        <div
          className={cn(
            'fixed right-5 transition-[transform,_opacity,_visibility] ease-linear',
            !isOpen && 'invisible scale-75 opacity-0'
          )}
        >
          <DropdownMenuItems handleClose={handleClose} items={items} />
        </div>
      </div>
      {isOpen && <Overlay className="bg-transparent" />}
    </>
  )
}

export default DropdownMenu
