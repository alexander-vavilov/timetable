import { Dispatch, FC, SetStateAction, useState } from 'react'
import Modal from '../Modal'
import { ILesson, ModalProps } from '../../types'
import Button from '../Button'
import { useParams } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../firebase'
import { toast } from 'sonner'
import UploadedFiles from '../UploadedFiles/UploadedFiles'
import { Timestamp, arrayUnion } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { compressImage } from '../../utils'
import useLesson from '../../hooks/useLesson'

interface UploadModalProps extends Pick<ModalProps, 'isOpen' | 'handleClose'> {
  files: File[]
  setUploadedFiles: Dispatch<SetStateAction<File[]>>
}

const UploadModal: FC<UploadModalProps> = ({
  isOpen,
  files,
  setUploadedFiles,
  handleClose
}) => {
  // const { scheduleId, lessonId } = useParams()

  // const [progress, setProgress] = useState(0)
  // const [isLoading, setIsLoading] = useState(false)

  // const { handleSave } = useLesson(lessonId || '')

  const handleAddFiles = () => {
    setUploadedFiles(files)
    handleClose()
  }

  // const uploadFiles = async () => {
  //   if (!files) return

  //   setIsLoading(true)

  //   try {
  //     for (const file of files) {
  //       if (file.size / 1024 / 1024 > 50) {
  //         throw new Error('Максимальный размер одного файла — 50мб.')
  //       }

  //       const compressedImage = await compressImage(file)

  //       const storageRef = ref(
  //         storage,
  //         `schedules/${scheduleId}/${lessonId}/${nanoid()}`
  //       )
  //       const uploadTask = uploadBytesResumable(storageRef, compressedImage)

  //       await new Promise((resolve, reject) => {
  //         uploadTask.on(
  //           'state_changed',
  //           (snapshot) => {
  //             setProgress(
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //             )
  //           },
  //           (error) => {
  //             console.log(error)
  //             toast.error('Что-то пошло не так..')
  //             reject(error)
  //           },
  //           async () => {
  //             try {
  //               const downloadURL = await getDownloadURL(
  //                 uploadTask.snapshot.ref
  //               )
  //               setFilesURL((filesURL) => [...filesURL, downloadURL])

  //               resolve('')
  //             } catch (error) {
  //               console.log(error)
  //               toast.error('Что-то пошло не так...')
  //             }
  //           }
  //         )
  //       })
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error instanceof Error ? error.message : 'Что-то пошло не так...'
  //     )
  //   } finally {
  //     setIsLoading(false)
  //     handleClose()
  //   }
  // }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      name='Загрузить'
      variant='mobileCompact'
      className='max-h-[90%] max-w-[300px] sm:max-w-sm'
    >
      <div className='h-full flex-auto overflow-y-auto overflow-x-hidden p-4'>
        <UploadedFiles files={files} setFiles={setUploadedFiles} />
      </div>
      <div className='flex flex-col gap-4 border-t border-gray-300 p-4 shadow-md dark:border-neutral-700 dark:shadow-none'>
        {/* {isLoading && (
          <div className='relative h-1 w-full overflow-hidden rounded-full bg-neutral-500'>
            <div
              className='absolute left-0 top-0 h-full bg-green-500'
              style={{ width: `${progress}%` }}
            />
          </div>
        )} */}
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
            <Button
              // isLoading={isLoading}
              onClick={handleAddFiles}
              className='flex-auto'
            >
              Загрузить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UploadModal
