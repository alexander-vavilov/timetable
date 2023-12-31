import { FC, useContext, useState } from 'react'
import MenuButton from './MenuButton'
import { useKeyDown } from '../../hooks/useKeyDown'
import MenuItems from './MenuItems'
import { cn } from '../../utils'
import { useClickAway } from '../../hooks/useClickAway'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import {
  IScheduleContext,
  IThemeContext,
  IUserContext
} from '../../types/contexts'
import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../../firebase'
import { toast } from 'sonner'
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
import { toastError } from '../../toast'
import { signOut } from 'firebase/auth'
import Overlay from '../Overlay'

const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  const ref = useClickAway(handleClose)
  useKeyDown((e) => {
    e.key === 'Escape' && setIsOpen(false)
  })

  const { isEditMode, setIsEditMode } = useContext(
    ScheduleContext
  ) as IScheduleContext
  const { theme, switchTheme } = useContext(ThemeContext) as IThemeContext
  const { currentUser } = useContext(UserContext) as IUserContext
  const { scheduleId } = useParams()

  const navigate = useNavigate()

  const isOwner = currentUser?.uid === scheduleId

  const handleDeleteSchedule = async () => {
    if (!scheduleId) return

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
      <div ref={ref} className='z-10'>
        <MenuButton
          onClick={() => setIsOpen((prevState) => !prevState)}
          isOpen={isOpen}
        />
        <div
          className={cn(
            'fixed right-5 transition-[transform,_opacity,_visibility] ease-linear',
            !isOpen && 'invisible scale-75 opacity-0'
          )}
        >
          <MenuItems handleClose={handleClose} items={items} />
        </div>
      </div>
      {isOpen && <Overlay className='bg-transparent' />}
    </>
  )
}

export default Menu
