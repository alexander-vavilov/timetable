import { Dispatch, FC, SetStateAction } from 'react'
import Modal from '../Modal'
import { ModalProps } from '../../types'
import Button from '../Button'
import UploadedFiles from '../UploadedFiles/UploadedFiles'
import { toastError } from '../../toast'

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
      name='Прикрепить'
      variant='mobileCompact'
      className='max-h-[90%] max-w-[300px] sm:max-w-sm'
    >
      <div className='h-full flex-auto overflow-y-auto overflow-x-hidden p-4'>
        <UploadedFiles files={currentFiles} setFiles={setCurrentFiles} />
      </div>
      <div className='flex flex-col gap-4 border-t border-gray-300 p-4 shadow-md dark:border-neutral-700 dark:shadow-none'>
        <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
          <label
            htmlFor='file'
            className='button cancel-button w-full flex-auto text-center sm:w-auto sm:flex-none'
          >
            Добавить
          </label>
          <div className='flex w-full items-center justify-end gap-2 sm:w-auto'>
            <Button onClick={handleClose} className='cancel-button flex-auto'>
              Отмена
            </Button>
            <Button onClick={attachFiles} className='flex-auto'>
              Прикрепить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AttachModal
