import { FC, useContext } from 'react'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import {
	IScheduleContext,
	IThemeContext,
	IUserContext,
} from '../../types/contexts'
import {
	MdClose,
	MdDeleteOutline,
	MdLogout,
	MdOutlineDarkMode,
	MdOutlineLightMode,
	MdOutlineModeEditOutline,
	MdOutlineSchedule,
	MdOutlineScheduleSend,
} from 'react-icons/md'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../../firebase'
import MenuItem from './MenuItem'
import { ThemeContext } from '../../contexts/ThemeContext'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { deleteDoc, doc } from 'firebase/firestore'

interface MenuItemsProps {
	handleClose: () => void
}

const MenuItems: FC<MenuItemsProps> = ({ handleClose }) => {
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
			toast.error('Не удалось удалить расписание.')
		}
	}

	const items = [
		{
			label: `${theme === 'light' ? 'Темный' : 'Светлый'} режим`,
			icon: theme === 'light' ? MdOutlineDarkMode : MdOutlineLightMode,
			handler: switchTheme,
		},
		{
			label: 'Режим редактирования',
			icon: isEditMode ? MdClose : MdOutlineModeEditOutline,
			handler: () => setIsEditMode(prevState => !prevState),
			permissions: !!scheduleId && isOwner,
		},
		{
			label: 'Создать свое расписание',
			icon: MdOutlineSchedule,
			handler: () => navigate(`/schedule/${currentUser?.uid}`),
			permissions: !isOwner,
		},
		{
			label: 'Поделиться расписанием',
			icon: MdOutlineScheduleSend,
			handler: () => navigate(`/schedule/${scheduleId}/share`),
			permissions: !!scheduleId,
		},
		{
			label: 'Выйти',
			icon: MdLogout,
			handler: () => signOut(auth),
		},
		{
			label: 'Удалить расписание',
			icon: MdDeleteOutline,
			handler: handleDeleteSchedule,
			warning: true,
			permissions: !!scheduleId && isOwner,
		},
	]

	return (
		<ul className='flex max-h-[278px] w-full max-w-[18rem] flex-col overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 bg-white p-2 shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none'>
			{items.map(({ ...props }) => (
				<MenuItem key={props.label} handleClose={handleClose} {...props} />
			))}
		</ul>
	)
}

export default MenuItems
