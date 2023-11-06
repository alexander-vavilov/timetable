import { FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { IScheduleContext, IUserContext } from '../../types/contexts'
import { ILesson } from '../../types'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import LessonsItemDeleteButton from './LessonsItemDeleteButton'
import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { UserContext } from '../../contexts/UserContext'
import { db } from '../../../firebase'

interface ILessonsItem extends ILesson {
	date: Date
	id: string
}

const LessonsItem: FC<ILessonsItem> = ({ date, ...props }) => {
	const { currentUser } = useContext(UserContext) as IUserContext
	const { isEditMode } = useContext(ScheduleContext) as IScheduleContext

	const deleteLesson = () => {
		if (!currentUser) return

		const docRef = doc(db, 'schedules', currentUser.uid)
		updateDoc(docRef, {
			[props.id]: deleteField(),
		})
	}

	const currentHomework = props.homework?.[date.toISOString()]

	return (
		<li className='flex w-full items-center transition-[background,_border-color] cursor:hover:bg-gray-100 cursor:hover:dark:bg-neutral-800'>
			{isEditMode && <LessonsItemDeleteButton onClick={() => deleteLesson()} />}
			<Link
				to={`lesson/${props.id}?date=${date.getTime()}`}
				className='flex w-full cursor-pointer items-center p-4'
			>
				<div className='flex flex-col text-xs'>
					<span>{props.start}</span>
					<span className='text-neutral-400'>{props.end}</span>
				</div>
				<div className='mx-3 h-8 w-0.5 rounded-full bg-black/20 transition-background dark:bg-white' />
				<div className='flex flex-col leading-none max-w-[250px]'>
					<span className='truncate'>{props.name}</span>
					{currentHomework && (
						<span className='truncate text-xs text-neutral-400'>
							{currentHomework}
						</span>
					)}
				</div>
			</Link>
		</li>
	)
}

export default LessonsItem
