import { FC, useContext } from 'react'
import { ILesson } from '../../types'
import { IScheduleContext } from '../../types/contexts'
import LessonsItem from './LessonsItem'
import LessonsAddButton from './LessonsAddButton'
import { ScheduleContext } from '../../contexts/ScheduleContext'

interface ILessons {
	items: ILesson[]
	date: Date
}

const Lessons: FC<ILessons> = ({ items, date }) => {
	const { isEditMode } = useContext(ScheduleContext) as IScheduleContext

	return (
		<ul className='divide-y divide-gray-200 bg-white shadow-md transition-background dark:divide-neutral-800 dark:bg-neutral-900 dark:shadow-none'>
			{items?.map(item => <LessonsItem key={item.id} date={date} {...item} />)}
			{isEditMode && <LessonsAddButton date={date} />}
		</ul>
	)
}

export default Lessons
