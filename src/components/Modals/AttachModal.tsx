import { Dispatch, FC, SetStateAction } from 'react'

import { toastError } from '../../toast'
import { ModalProps } from '../../types'
import Button from '../Button'
import Modal from '../Modal/Modal'
import ModalContent from '../Modal/ModalContent'
import ModalFooter from '../Modal/ModalFooter'
import UploadedFiles from '../UploadedFiles/UploadedFiles'

interface AttachModalProps extends Pick<ModalProps, 'isOpen' | 'handleClose'> {
  currentFiles: File[]
  setCurrentFiles: Dispatch<SetStateAction<File[]>>
  setAttachedFiles: Dispatch<SetStateAction<File[]>>
}

const AttachModal: FC<AttachModalProps> = ({
  isOpen,
  currentFiles,
  setCurrentFiles,
  setAttachedFiles,
  handleClose
}) => {
  const attachFiles = () => {
    try {
      const filteredFiles = currentFiles.filter((file) => {
        const maxFileSize = 15
        const isExceeded = file.size / 1024 / 1024 > maxFileSize

        if (isExceeded) {
          throw new Error(
            `Размер файла ${file.name} превышает ${maxFileSize}мб.`
          )
        }
        return !isExceeded
      })

      setAttachedFiles(filteredFiles)
      handleClose()
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      name="Прикрепить"
      variant="mobileCompact"
      className="max-h-[90%] max-w-[300px] sm:max-w-sm"
    >
      <ModalContent>
        <UploadedFiles files={currentFiles} setFiles={setCurrentFiles} />
      </ModalContent>
      <ModalFooter className="justify-between gap-2">
        <label
          htmlFor="file"
          className="button cancel-button w-full flex-auto text-center sm:w-auto sm:flex-none"
        >
          Добавить
        </label>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          <Button onClick={handleClose} className="cancel-button flex-auto">
            Отмена
          </Button>
          <Button onClick={attachFiles} className="flex-auto">
            Прикрепить
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default AttachModal
