import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { ref } from 'firebase/storage'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { db, storage } from '../../../firebase'
import { useFirebase } from '../../hooks/useFirebase'

export const useUnprocessedFiles = () => {
  const [unprocessedFiles, setUnprocessedFiles] = useState<File[]>([])

  const { scheduleId, lessonId } = useParams()
  const { uploadFile } = useFirebase()

  const storageRef = ref(storage, `schedules/${scheduleId}/${lessonId}`)
  const processFiles = async () => {
    if (!scheduleId || !lessonId) return

    for (const file of unprocessedFiles) {
      const fileRef = ref(storageRef, nanoid())
      const { name, fullPath, url } = await uploadFile(file, fileRef)

      await updateDoc(doc(db, 'schedules', scheduleId, 'lessons', lessonId), {
        files: arrayUnion({ name, fullPath, url })
      })

      setUnprocessedFiles((files) => {
        return files.filter((currentFile) => currentFile !== file)
      })
    }

    setUnprocessedFiles([])
  }

  return {
    unprocessedFiles,
    setUnprocessedFiles,
    processFiles
  }
}
