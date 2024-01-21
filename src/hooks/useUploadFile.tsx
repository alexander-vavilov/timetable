import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { storage } from '../../firebase'
import { toastError } from '../toast'
import { compressImage } from '../utils'

const useUploadFile = () => {
  const { scheduleId, lessonId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (file: File, maxFileSize: number = 15) => {
    if (!file) return

    setIsLoading(true)

    try {
      if (file.size / 1024 / 1024 > maxFileSize) {
        throw new Error(`Максимальный размер одного файла — ${maxFileSize}мб.`)
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
      toastError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleUpload, isLoading, progress }
}

export default useUploadFile
