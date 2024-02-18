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
    status: { isUnprocessed, isSavingInProgress },
    functions: { handleSave },
    state
  } = useLesson(lessonId as string)

  const [isWarningOpen, setIsWarningOpen] = useState(false)

  const { isOwner } = useContext(ScheduleContext) as IScheduleContext

  const navigate = useNavigate()
  const closeModal = () => navigate(`/schedule/${scheduleId}`)

  const handleCloseModal = () => {
    if (isSavingInProgress)
      toast.info(
        'Дождитесь окончания сохранения. Это может занять некоторое время.'
      )
    else if (isUnprocessed) setIsWarningOpen(true)
    else closeModal()
  }

  return (
    <Modal
      onRequestClose={handleCloseModal}
      name="Детали"
      className="h-full max-h-full rounded-none md:max-h-[48%] md:rounded-md"
    >
      <form
        className="flex flex-auto flex-col overflow-y-auto"
        onSubmit={(e) => {
          e.preventDefault()
          !isSavingInProgress && handleSave()
        }}
      >
        <Modal.Content className="flex-auto pt-6">
          <Input
            type="text"
            required
            editable={isOwner}
            styleVariant="flushed"
            value={state.name}
            onChange={(e) => state.setName(e.target.value)}
            className="text-3xl"
            placeholder="предмет"
            autoFocus={!state.name.length}
          />
          <div className="flex flex-col gap-4 pt-10">
            <Input
              type="text"
              editable={isOwner}
              value={state.teacher}
              onChange={(e) => state.setTeacher(e.target.value)}
              placeholder="учитель"
            />
            <Input
              type="text"
              editable={isOwner}
              value={state.location}
              onChange={(e) => state.setLocation(e.target.value)}
              placeholder="кабинет"
            />
            <LessonViewTimeInputs
              time={state.time}
              setTime={state.setTime}
              editable={isOwner}
            />
            <Input
              type="text"
              editable={isOwner}
              value={state.homework}
              onChange={(e) => state.setHomework(e.target.value)}
              placeholder="домашнее задание"
            />
          </div>
          {isOwner && (
            <LessonViewAttachFilesButton
              setUnprocessedFiles={state.setUnprocessedFiles}
            />
          )}
          {!!state.unprocessedFiles.length && (
            <LessonViewUnprocessedFiles
              files={state.unprocessedFiles}
              setUnprocessedFiles={state.setUnprocessedFiles}
            />
          )}
          {!!state.files.length && (
            <LessonViewAttachments files={state.files} />
          )}
        </Modal.Content>
        {isOwner && isUnprocessed && (
          <Modal.Footer className="justify-end">
            <Button type="submit" isLoading={isSavingInProgress}>
              Сохранить
            </Button>
          </Modal.Footer>
        )}
      </form>
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
