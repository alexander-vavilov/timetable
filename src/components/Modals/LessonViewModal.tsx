import { FC, useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ScheduleContext } from '../../contexts/ScheduleContext'
import { IScheduleContext } from '../../types/contexts'
import Button from '../Button'
import Input from '../Input'
import LessonViewAttachFilesButton from '../LessonView/LessonViewAttachFilesButton'
import LessonViewAttachments from '../LessonView/LessonViewAttachments'
import LessonViewTimeInputs from '../LessonView/LessonViewTimeInputs'
import LessonViewUnprocessedFiles from '../LessonView/LessonViewUnprocessedFiles'
import { useLesson } from '../LessonView/useLesson'
import Modal from '../Modal/Modal'
import WarningModal from './WarningModal'

const LessonViewModal: FC = () => {
  const { lessonId, scheduleId } = useParams()
  const {
    state: { isUnprocessed, isSavingInProgress },
    functions: { handleSave },
    formState
  } = useLesson(lessonId as string)

  const [isWarningOpen, setIsWarningOpen] = useState(false)

  const { isOwner } = useContext(ScheduleContext) as IScheduleContext

  const navigate = useNavigate()
  const closeModal = () => navigate(`/schedule/${scheduleId}`)

  const handleCloseModal = () => {
    const toastMessage =
      'Дождитесь окончания сохранения. Это может занять некоторое время.'

    if (isSavingInProgress) return toast.info(toastMessage)
    if (isUnprocessed) return setIsWarningOpen(true)

    closeModal()
  }

  return (
    <Modal
      onRequestClose={handleCloseModal}
      name="Детали"
      className="max-h-[48%]"
    >
      <Modal.Content>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            !isSavingInProgress && handleSave()
          }}
          className="flex flex-col overflow-auto"
        >
          <Input
            type="text"
            editable={isOwner}
            styleVariant="flushed"
            value={formState.name}
            onChange={(e) => formState.setName(e.target.value)}
            className="text-3xl"
            placeholder="предмет"
            autoFocus={!formState.name.length}
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
          </div>
          <input type="submit" hidden />
        </form>
        {isOwner && (
          <LessonViewAttachFilesButton
            setUnprocessedFiles={formState.setUnprocessedFiles}
          />
        )}
        {!!formState.unprocessedFiles.length && (
          <LessonViewUnprocessedFiles
            files={formState.unprocessedFiles}
            setUnprocessedFiles={formState.setUnprocessedFiles}
          />
        )}
        {!!formState.files.length && (
          <LessonViewAttachments files={formState.files} />
        )}
      </Modal.Content>
      {isOwner && isUnprocessed && (
        <Modal.Footer className="justify-end">
          <Button
            type="submit"
            onClick={handleSave}
            isLoading={isSavingInProgress}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      )}
      {isWarningOpen && (
        <WarningModal
          onRequestClose={() => setIsWarningOpen(false)}
          name="Отменить изменения"
          message="Внесенные изменения не будут сохранены."
          confirm={{ action: closeModal, label: 'Выйти' }}
        />
      )}
    </Modal>
  )
}

export default LessonViewModal
