import { FC, useContext } from 'react'
import { IScheduleContext } from '../../types/contexts'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import Lessons from '../Lessons/Lessons'
import { getDay } from 'date-fns'
import ScheduleDayHeading from './ScheduleDayHeading'

const ScheduleDay: FC<{ date: Date }> = ({ date }) => {
	const { lessons, isEditMode } = useContext(
		ScheduleContext
	) as IScheduleContext

	const lessonsArr = Object.keys(lessons).map(key => ({
		...lessons[key],
		id: key,
	}))

	const dayLessons = lessonsArr.filter(({ weekDay }) => {
		return weekDay === getDay(date)
	})

	if (!dayLessons?.length && !isEditMode) return
	return (
		<div className='flex flex-col'>
			<ScheduleDayHeading date={date} />
			<Lessons date={date} items={dayLessons} />
		</div>
	)
}

export default ScheduleDay
