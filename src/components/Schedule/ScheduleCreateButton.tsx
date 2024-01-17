import { FC, useContext } from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { IScheduleContext, IUserContext } from '../../types/contexts'
import { ScheduleContext } from '../../contexts/ScheduleContext'

const ScheduleCreateButton: FC<{ isOwner: boolean }> = ({ isOwner }) => {
	const { currentUser } = useContext(UserContext) as IUserContext
	const { setIsEditMode } = useContext(ScheduleContext) as IScheduleContext

	return isOwner ? (
		<Button onClick={() => setIsEditMode(true)}>Создать</Button>
	) : (
		<Link to={`/schedule/${currentUser?.uid}`} className='button'>
			Создать свое расписание
		</Link>
	)
}

export default ScheduleCreateButton
