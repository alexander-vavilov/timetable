import { Dispatch, FC, SetStateAction, useState } from 'react'

import ImagesViewer from '../ImageViewer/ImageViewer'
import UploadedFile from './UploadedFile'

interface UploadedFilesProps {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const UploadedFiles: FC<UploadedFilesProps> = ({ files, setFiles }) => {
  const filesURL = files.map((file) => URL.createObjectURL(file))

  const [viewedImageIndex, setViewedImageIndex] = useState<number | null>(null)

  const handleDeleteFile = (index: number) => {
    const filteredFiles = [...files].filter((_, idx) => index !== idx)
    setFiles(filteredFiles)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {files.map((file, index) => (
        <UploadedFile
          key={file.name}
          file={file}
          onClick={() => setViewedImageIndex(index)}
          handleDeleteFile={() => handleDeleteFile(index)}
        />
      ))}
      {viewedImageIndex !== null && (
        <ImagesViewer
          filesURL={filesURL}
          viewedImageIndex={viewedImageIndex}
          setViewedImageIndex={setViewedImageIndex}
        />
      )}
    </div>
  )
}

export default UploadedFiles
