import { FC } from 'react'
import Button from '../Button'

const LessonFooter: FC<{ handleSave: () => void }> = ({ handleSave }) => {
	return (
		<div className='flex justify-end border-t border-gray-300 p-4 text-white shadow-md dark:border-neutral-700 dark:shadow-none'>
			<Button onClick={handleSave}>Сохранить</Button>
		</div>
	)
}

export default LessonFooter
