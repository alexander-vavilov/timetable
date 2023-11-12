import { Dispatch, FC, SetStateAction, useState } from 'react'
import UploadedFile from './UploadedFile'
import ImagesViewer from '../ImagesViewer/ImageViewer'

interface UploadedFilesProps {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const UploadedFiles: FC<UploadedFilesProps> = ({ files, setFiles }) => {
  const [viewedImageURL, setViewedImageURL] = useState<string | null>(null)

  const handleDeleteFile = (index: number) => {
    const filteredFiles = [...files].filter((_, idx) => index !== idx)
    setFiles(filteredFiles)
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {files.map((file, index) => (
        <UploadedFile
          key={file.name}
          file={file}
          handleDeleteFile={() => handleDeleteFile(index)}
          setViewedImageURL={setViewedImageURL}
        />
      ))}
      {viewedImageURL && (
        <ImagesViewer
          viewedImageURL={viewedImageURL}
          setViewedImageURL={setViewedImageURL}
        />
      )}
    </div>
  )
}

export default UploadedFiles
