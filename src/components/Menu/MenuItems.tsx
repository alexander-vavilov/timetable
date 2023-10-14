import { FC, useContext, useState } from 'react'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import {
  ScheduleContextType,
  ThemeContextType,
  UserContextType
} from '../../types/contexts'
import {
  MdClose,
  MdDeleteOutline,
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineModeEditOutline,
  MdOutlineScheduleSend
} from 'react-icons/md'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'
import MenuItem from './MenuItem'
import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext'
import ShareModal from '../ShareModal'
import { useParams } from 'react-router-dom'
import useSchedule from '../../hooks/useSchedule'
import { toast } from 'sonner'

interface IMenuItems {
  handleCloseMenu: () => void
}

const MenuItems: FC<IMenuItems> = ({ handleCloseMenu }) => {
  const { isEditMode, setIsEditMode } = useContext(
    ScheduleContext
  ) as ScheduleContextType
  const { theme, switchTheme } = useContext(ThemeContext) as ThemeContextType
  const { currentUser } = useContext(UserContext) as UserContextType
  const { scheduleId } = useParams()

  const isOwner = currentUser?.uid === scheduleId

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const { deleteSchedule } = useSchedule()

  const handleDeleteSchedule = () => {
    try {
      deleteSchedule()
    } catch (error) {
      toast.error('Не удалось удалить расписание')
    }
  }

  const items = [
    {
      label: `${theme === 'light' ? 'Темный' : 'Светлый'} режим`,
      icon: theme === 'light' ? MdOutlineDarkMode : MdOutlineLightMode,
      handler: switchTheme,
      display: true,
      warning: false
    },
    {
      label: 'Режим редактирования',
      icon: isEditMode ? MdClose : MdOutlineModeEditOutline,
      handler: () => setIsEditMode((prevState) => !prevState),
      display: !!scheduleId && isOwner,
      warning: false
    },
    {
      label: 'Поделиться расписанием',
      icon: MdOutlineScheduleSend,
      handler: () => setIsShareModalOpen(true),
      display: !!scheduleId,
      warning: false
    },
    {
      label: 'Выйти',
      icon: MdLogout,
      handler: () => signOut(auth),
      display: true,
      warning: false
    },
    {
      label: 'Удалить расписание',
      icon: MdDeleteOutline,
      handler: handleDeleteSchedule,
      warning: true,
      display: !!scheduleId && isOwner
    }
  ]

  return (
    <ul className='flex max-h-[278px] w-full max-w-[18rem] flex-col overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none'>
      {items.map(({ ...props }) => (
        <MenuItem
          key={props.label}
          handleCloseMenu={handleCloseMenu}
          {...props}
        />
      ))}
      {isShareModalOpen && (
        <ShareModal handleClose={() => setIsShareModalOpen(false)} />
      )}
    </ul>
  )
}

export default MenuItems
