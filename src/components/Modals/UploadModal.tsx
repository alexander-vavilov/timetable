import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import Modal from '../Modal'
import { IModal } from '../../types'
import Spinner from '../Spinner'
import Button from '../Button'
import { useParams } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../../firebase'
import { toast } from 'sonner'
import UploadedFiles from '../UploadedFiles/UploadedFiles'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { UserContext } from '../../contexts/UserContext'
import { IUserContext } from '../../types/contexts'
import { nanoid } from 'nanoid'

interface IUploadModal extends Pick<IModal, 'isOpen' | 'handleClose'> {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const UploadModal: FC<IUploadModal> = ({
  isOpen,
  handleClose,
  files,
  setFiles
}) => {
  const { scheduleId, lessonId } = useParams()
  const { currentUser } = useContext(UserContext) as IUserContext

  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const uploadFiles = async () => {
    if (!files) return

    setIsLoading(true)

    try {
      for (const file of files) {
        if (file.size / 1024 / 1024 > 50) {
          throw new Error('Максимальный размер одного файла — 50мб')
        }

        const storageRef = ref(storage, `${scheduleId}/${lessonId}/${nanoid()}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              setProgress(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            },
            (error) => {
              console.log(error)
              toast.error('Что-то пошло не так..')
              reject(error)
            },
            async () => {
              if (!currentUser || !lessonId) return

              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              const docRef = doc(
                db,
                'schedules',
                currentUser.uid,
                'lessons',
                lessonId
              )
              const docSnap = await getDoc(docRef)

              if (docSnap.exists()) {
                await updateDoc(docRef, { files: arrayUnion(downloadURL) })
              } else {
                await setDoc(docRef, { files: arrayUnion(downloadURL) })
              }

              resolve('')
            }
          )
        })
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Что-то пошло не так...'
      )
    } finally {
      setIsLoading(false)
      handleClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      name='Загрузить'
      variant='mobileCompact'
      className='max-w-[300px] sm:max-w-sm'
    >
      {files === null ? (
        <div className='flex items-center justify-center p-8'>
          <Spinner />
        </div>
      ) : (
        <div className='p-4'>
          <UploadedFiles files={files} setFiles={setFiles} />
          {isLoading && (
            <div className='relative mt-4 h-1 w-full overflow-hidden rounded-full bg-neutral-500'>
              <div
                className='absolute left-0 top-0 h-full bg-green-500'
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          <div className='flex items-center justify-between pt-4'>
            <label htmlFor='file'>Добавить</label>

            <div className='flex items-center justify-end gap-2'>
              <Button onClick={handleClose} className='cancel-button'>
                Отмена
              </Button>
              <Button isLoading={isLoading} onClick={uploadFiles}>
                Загрузить
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default UploadModal
