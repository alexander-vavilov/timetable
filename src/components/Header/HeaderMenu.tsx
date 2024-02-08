import { signOut } from 'firebase/auth'
import { FC, useContext, useState } from 'react'
import {
  MdClose,
  MdDeleteOutline,
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineModeEditOutline,
  MdOutlineScheduleSend
} from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { auth } from '../../../firebase'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useKeyDown } from '../../hooks/useKeyDown'
import useSchedule from '../../hooks/useSchedule'
import { IScheduleContext, IThemeContext } from '../../types/contexts'
import { MenuItem } from '../../types/menu'
import { cn } from '../../utils'
import Menu from '../Menu/Menu'
import MenuButton from '../Menu/MenuButton'
import Overlay from '../Overlay'

const HeaderMenu: FC = () => {
  const { theme, switchTheme } = useContext(ThemeContext) as IThemeContext
  const { isOwner, isEditMode, setIsEditMode } = useContext(
    ScheduleContext
  ) as IScheduleContext

  const { scheduleId } = useParams()
  const navigate = useNavigate()

  const { deleteSchedule } = useSchedule()

  const [isOpen, setIsOpen] = useState(false)

  const items: MenuItem[] = [
    {
      label: `${theme === 'light' ? 'Темный' : 'Светлый'} режим`,
      icon: theme === 'light' ? MdOutlineDarkMode : MdOutlineLightMode,
      action: switchTheme
    },
    {
      label: 'Режим редактирования',
      icon: isEditMode ? MdClose : MdOutlineModeEditOutline,
      action: () => setIsEditMode((prevState) => !prevState),
      permission: !!scheduleId && isOwner
    },
    {
      label: 'Поделиться расписанием',
      icon: MdOutlineScheduleSend,
      action: () => navigate(`/schedule/${scheduleId}/share`),
      permission: !!scheduleId
    },
    {
      label: 'Выйти',
      icon: MdLogout,
      action: () => signOut(auth)
    },
    {
      label: 'Удалить расписание',
      icon: MdDeleteOutline,
      action: () => deleteSchedule(scheduleId || null),
      warning: {
        name: 'Удалить',
        message: 'Вы уверены, что хотите удалить расписание?',
        confirmLabel: 'Удалить'
      },
      permission: !!scheduleId && isOwner
    }
  ]

  const handleClose = () => setIsOpen(false)
  useKeyDown((e) => {
    if (e.key === 'Escape') handleClose()
  })

  return (
    <>
      <div className="relative z-10">
        <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        <div
          className={cn(
            'fixed right-6 top-12 transition-all ease-linear',
            !isOpen && 'invisible scale-75 opacity-0'
          )}
        >
          <Menu
            onRequestClose={() => setIsOpen(false)}
            items={items}
            variant="default"
          />
        </div>
      </div>
      {isOpen && <Overlay onClick={handleClose} className="bg-transparent" />}
    </>
  )
}

export default HeaderMenu
