import { FC, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ScheduleContext } from '../../contexts/ScheduleContext'
import useLesson from '../../hooks/useLesson'
import { IScheduleContext } from '../../types/contexts'
import Button from '../Button'
import Input from '../Input'
import LessonViewAttachFilesButton from '../LessonView/LessonViewAttachFilesButton'
import LessonViewAttachments from '../LessonView/LessonViewAttachments'
import LessonViewTimeInputs from '../LessonView/LessonViewTimeInputs'
import LessonViewUnprocessedFiles from '../LessonView/LessonViewUnprocessedFiles'
import Modal from '../Modal/Modal'
import ModalContent from '../Modal/ModalContent'
import ModalFooter from '../Modal/ModalFooter'
import WarningModal from './WarningModal'

const LessonViewModal: FC = () => {
  const { lessonId, scheduleId } = useParams()
  const {
    state: { isNewLesson, isUnprocessed, isSavingInProgress },
    functions: { handleSave },
    formState
  } = useLesson(lessonId as string)

  const [isWarningOpen, setIsWarningOpen] = useState(false)

  const { isOwner } = useContext(ScheduleContext) as IScheduleContext

  const navigate = useNavigate()
  const closeModal = () => navigate(`/schedule/${scheduleId}`)

  const handleCloseModal = () => {
    if (isUnprocessed && !isNewLesson) {
      setIsWarningOpen(true)
    } else if (isSavingInProgress) {
      toast.info(
        'Дождитесь окончания сохранения. Это может занять некоторое время.'
      )
    } else {
      closeModal()
    }
  }

  return (
    <Modal handleClose={handleCloseModal} name="Детали">
      <ModalContent className="pt-6">
        <Input
          type="text"
          editable={isOwner}
          styleVariant="flushed"
          value={formState.name}
          onChange={(e) => formState.setName(e.target.value)}
          className="text-3xl"
          placeholder="предмет"
          autoFocus={!formState.name} // the name is empty => this is probably a new lesson
        />
        <div className="flex flex-col gap-4 pt-10">
          <Input
            type="text"
            editable={isOwner}
            value={formState.teacher}
            onChange={(e) => formState.setTeacher(e.target.value)}
            placeholder="учитель"
          />
          <Input
            type="text"
            editable={isOwner}
            value={formState.location}
            onChange={(e) => formState.setLocation(e.target.value)}
            placeholder="кабинет"
          />
          <LessonViewTimeInputs
            time={formState.time}
            setTime={formState.setTime}
            editable={isOwner}
          />
          <Input
            type="text"
            editable={isOwner}
            value={formState.homework}
            onChange={(e) => formState.setHomework(e.target.value)}
            placeholder="Домашнее задание"
          />
          <LessonViewAttachFilesButton
            setUnprocessedFiles={formState.setUnprocessedFiles}
          />
          {!!formState.unprocessedFiles.length && (
            <LessonViewUnprocessedFiles
              files={formState.unprocessedFiles}
              setUnprocessedFiles={formState.setUnprocessedFiles}
            />
          )}
          {!!formState.existingFilesURL.length && (
            <LessonViewAttachments filesURL={formState.existingFilesURL} />
          )}
        </div>
      </ModalContent>
      {isUnprocessed && (
        <ModalFooter className="justify-end">
          <Button onClick={handleSave} isLoading={isSavingInProgress}>
            Сохранить
          </Button>
        </ModalFooter>
      )}
      <WarningModal
        isOpen={isWarningOpen}
        handleClose={() => setIsWarningOpen(false)}
        name="Отменить изменения"
        message="Внесенные изменения не будут сохранены."
        confirmHandler={closeModal}
        confirmButtonLabel="Пффф... Выйти"
      />
    </Modal>
  )
}

export default LessonViewModal
