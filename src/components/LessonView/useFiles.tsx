import { ref } from 'firebase/storage'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { storage } from '../../../firebase'
import useFirebaseStorage from '../../hooks/useFirebaseStorage'
import { firebaseFile } from '../../types'

const useFiles = () => {
  const [existingFiles, setExistingFiles] = useState<firebaseFile[]>([])
  const [unprocessedFiles, setUnprocessedFiles] = useState<File[]>([])

  const { scheduleId, lessonId } = useParams()

  const { getFilesURLs } = useFirebaseStorage()

  const storageRef = ref(storage, `schedules/${scheduleId}/${lessonId}`)
  const fetch = async () => getFilesURLs(storageRef).then(setExistingFiles)

  const { uploadFile } = useFirebaseStorage()

  const processFiles = async (files: File[] | FileList = unprocessedFiles) => {
    for (const file of [...files]) {
      const fileRef = ref(storageRef, nanoid())
      await uploadFile(file, fileRef)
    }

    fetch()
    setUnprocessedFiles([])
  }

  useEffect(() => {
    fetch()
  }, [])

  return {
    existingFiles,
    unprocessedFiles,
    setUnprocessedFiles,
    processFiles
  }
}

export default useFiles
