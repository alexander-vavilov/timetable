import { useState } from 'react'
import { compressImage } from '../utils'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'

const useUploadFile = () => {
  const { scheduleId, lessonId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (file: File) => {
    if (!file) return

    setIsLoading(true)

    try {
      if (file.size / 1024 / 1024 > 50) {
        throw new Error('Максимальный размер одного файла — 50мб.')
      }

      const compressedImage = await compressImage(file)

      const storageRef = ref(
        storage,
        `schedules/${scheduleId}/${lessonId}/${new Date().getTime() + nanoid()}`
      )
      const uploadTask = uploadBytesResumable(storageRef, compressedImage)

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          },
          (error) => {
            console.log(error)
            toast.error('Что-то пошло не так..')
            reject(error)
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              resolve(downloadURL)
            } catch (error) {
              console.log(error)
              toast.error('Что-то пошло не так...')
            }
          }
        )
      })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Что-то пошло не так...'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { handleUpload, isLoading, progress }
}

export default useUploadFile
