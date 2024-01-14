import { FC, Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDay } from 'date-fns'
import { toastError } from '../../toast'
import isEqual from 'lodash.isequal'
import Button from '../Button'
import Input from '../Input'
import ModalContent from '../Modal/ModalContent'
import ModalFooter from '../Modal/ModalFooter'
import LessonViewAttachFilesButton from './LessonViewAttachFilesButton'
import LessonViewAttachments from './LessonViewAttachments'
import LessonViewTimeInputs from './LessonViewTimeInputs'
import LessonViewUnprocessedFiles from './LessonViewUnprocessedFiles'
import useLesson from '../../hooks/useLesson'
import useFilesState from './useFiles'
import useTimeCalc from './useTimeCalc'

const LessonView: FC = () => {
	const { lessonId } = useParams()
	const { lessonData, saveLesson, unixDateTime, isEditable } = useLesson(
		lessonId as string
	)

	const weekDay = getDay(new Date(unixDateTime))
	const { start, end } = useTimeCalc(weekDay)

	const [name, setName] = useState(lessonData?.name || '')
	const [teacher, setTeacher] = useState(lessonData?.teacher || '')
	const [location, setLocation] = useState(lessonData?.location || '')
	const [time, setTime] = useState({
		start: lessonData?.start || start,
		end: lessonData?.end || end,
	})
	const [homework, setHomework] = useState(
		lessonData?.homework?.[unixDateTime] || ''
	)

	const {
		existingFilesURL,
		unprocessedFiles,
		setUnprocessedFiles,
		processFiles,
	} = useFilesState()

	const currentLessonData = {
		name,
		teacher,
		location,
		weekDay,
		start: time.start,
		end: time.end,
		homework: {
			...lessonData?.homework,
			...(homework && { [unixDateTime]: homework }),
		},
	}

	const isContentChanged = !isEqual(currentLessonData, lessonData)
	const [isSavingLoading, setIsSavingLoading] = useState(false)

	const handleSave = async () => {
		setIsSavingLoading(true)

		try {
			if (isContentChanged) saveLesson(currentLessonData)
			if (unprocessedFiles.length > 0) await processFiles()
		} catch (error) {
			toastError(error)
		} finally {
			setIsSavingLoading(false)
		}
	}

	return (
		<Fragment>
			<ModalContent className='pt-6'>
				<Input
					type='text'
					editable={isEditable}
					styleVariant='flushed'
					value={name}
					onChange={e => setName(e.target.value)}
					className='text-3xl'
					placeholder='предмет'
				/>
				<div className='flex flex-col gap-4 pt-10'>
					<Input
						type='text'
						editable={isEditable}
						value={teacher}
						onChange={e => setTeacher(e.target.value)}
						placeholder='учитель'
					/>
					<Input
						type='text'
						editable={isEditable}
						value={location}
						onChange={e => setLocation(e.target.value)}
						placeholder='кабинет'
					/>
					<LessonViewTimeInputs
						time={time}
						setTime={setTime}
						isEditable={isEditable}
					/>
					<Input
						type='text'
						editable={isEditable}
						value={homework}
						onChange={e => setHomework(e.target.value)}
						placeholder='Домашнее задание'
					/>
					{isEditable && (
						<LessonViewAttachFilesButton
							setUnprocessedFiles={setUnprocessedFiles}
						/>
					)}
					{unprocessedFiles.length > 0 && (
						<LessonViewUnprocessedFiles
							files={unprocessedFiles}
							setUnprocessedFiles={setUnprocessedFiles}
						/>
					)}
					{existingFilesURL.length > 0 && (
						<LessonViewAttachments filesURL={existingFilesURL} />
					)}
				</div>
			</ModalContent>
			{(isContentChanged || unprocessedFiles.length > 0) && (
				<ModalFooter className='justify-end'>
					<Button onClick={handleSave} isLoading={isSavingLoading}>
						Сохранить
					</Button>
				</ModalFooter>
			)}
		</Fragment>
	)
}

export default LessonView
