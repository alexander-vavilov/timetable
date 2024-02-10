import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { ref } from 'firebase/storage'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { db, storage } from '../../../firebase'
import { useFirebaseStorage } from '../../hooks/useFirebaseStorage'
import { toastError } from '../../toast'

export const useUnprocessedFiles = () => {
  const [unprocessedFiles, setUnprocessedFiles] = useState<File[]>([])

  const { scheduleId, lessonId } = useParams()
  const { uploadFile } = useFirebaseStorage()

  const storageRef = ref(storage, `schedules/${scheduleId}/${lessonId}`)
  const processFiles = async (files: File[] | FileList = unprocessedFiles) => {
    if (!scheduleId || !lessonId) return

    try {
      for (const file of [...files]) {
        const fileRef = ref(storageRef, nanoid())
        const { name, fullPath, url } = await uploadFile(file, fileRef)

        await updateDoc(doc(db, 'schedules', scheduleId, 'lessons', lessonId), {
          files: arrayUnion({ name, fullPath, url })
        })
      }

      setUnprocessedFiles([])
    } catch (error) {
      toastError(error)
    }
  }

  return {
    unprocessedFiles,
    setUnprocessedFiles,
    processFiles
  }
}
