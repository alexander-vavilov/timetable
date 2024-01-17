import { FC } from 'react'
import ScheduleDay from './ScheduleDay'

const ScheduleDays: FC<{ days: Date[] }> = ({ days }) => {
	return (
		<div className='flex flex-col gap-4'>
			{days.map(date => (
				<ScheduleDay key={date.toISOString()} date={date} />
			))}
		</div>
	)
}

export default ScheduleDays
