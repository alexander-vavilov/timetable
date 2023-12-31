import useUploadFile from '../../hooks/useUploadFile'

const useUploadFiles = () => {
  const { handleUpload } = useUploadFile()

  const handleUploadLessonFiles = async (files: File[]) => {
    const uploadedFilesURL: string[] = []

    for (const file of files) {
      const downloadURL = await handleUpload(file)
      if (typeof downloadURL === 'string') {
        uploadedFilesURL.push(downloadURL)
      }
    }

    return uploadedFilesURL
  }

  return handleUploadLessonFiles
}

export default useUploadFiles
