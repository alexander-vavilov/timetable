import { FC, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../Modal/Modal'
import { IScheduleContext } from '../../types/contexts'
import { ScheduleContext } from '../../contexts/ScheduleContext'
import LessonViewPlaceholder from '../LessonView/LessonViewPlaceholder'
import { toast } from 'sonner'
import useLesson from '../../hooks/useLesson'
import { getDay } from 'date-fns'
import useTimeCalc from '../LessonView/useTimeCalc'
import useFiles from '../LessonView/useFiles'
import isEqual from 'lodash.isequal'
import { toastError } from '../../toast'
import ModalContent from '../Modal/ModalContent'
import Input from '../Input'
import LessonViewTimeInputs from '../LessonView/LessonViewTimeInputs'
import LessonViewAttachFilesButton from '../LessonView/LessonViewAttachFilesButton'
import LessonViewUnprocessedFiles from '../LessonView/LessonViewUnprocessedFiles'
import LessonViewAttachments from '../LessonView/LessonViewAttachments'
import ModalFooter from '../Modal/ModalFooter'
import Button from '../Button'
import WarningModal from './WarningModal'

const LessonViewModal: FC = () => {
	const { scheduleId, lessonId } = useParams()
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
	} = useFiles()

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

	const [isSaving, setIsSaving] = useState(false)
	const [isWarningOpen, setIsWarningOpen] = useState(false)

	const handleSave = async () => {
		setIsSaving(true)

		try {
			if (isContentChanged) saveLesson(currentLessonData)
			if (unprocessedFiles.length > 0) await processFiles()
		} catch (error) {
			toastError(error)
		} finally {
			setIsSaving(false)
		}
	}

	const { isLoading: isContentLoading } = useContext(
		ScheduleContext
	) as IScheduleContext

	const navigate = useNavigate()
	const closeModal = () => navigate(`/schedule/${scheduleId}`)

	const handleCloseModal = () => {
		if (isContentChanged) {
			setIsWarningOpen(true)
		} else if (isSaving) {
			toast.info(
				'Дождитесь окончания сохранения. Это может занять некоторое время.'
			)
		} else {
			closeModal()
		}
	}

	return (
		<Modal handleClose={handleCloseModal} name='Детали'>
			{isContentLoading ? (
				<LessonViewPlaceholder />
			) : (
				<>
					<ModalContent className='pt-6'>
						<Input
							type='text'
							editable={isEditable}
							styleVariant='flushed'
							value={name}
							onChange={e => setName(e.target.value)}
							className='text-3xl'
							placeholder='предмет'
							autoFocus={!lessonData} // lessonData - null => it's new lesson
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
							<Button onClick={handleSave} isLoading={isSaving}>
								Сохранить
							</Button>
						</ModalFooter>
					)}
					<WarningModal
						isOpen={isWarningOpen}
						handleClose={() => setIsWarningOpen(false)}
						name='Отменить изменения'
						message='Внесенные изменения не будут сохранены.'
						confirmHandler={closeModal}
						confirmButtonLabel='Пффф... Выйти'
					/>
				</>
			)}
		</Modal>
	)
}

export default LessonViewModal
