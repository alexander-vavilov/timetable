import { Dispatch, FC, SetStateAction, useState } from 'react'
import UploadedFile from './UploadedFile'
import ImagesViewer from '../ImagesViewer/ImageViewer'

interface IUploadedFiles {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const UploadedFiles: FC<IUploadedFiles> = ({ files, setFiles }) => {
  const [viewedImageURL, setViewedImageURL] = useState<string | null>(null)

  const handleDeleteFile = (index: number) => {
    setFiles([...files].filter((_, idx) => index !== idx))
  }

  return (
    <div className='flex flex-col gap-2'>
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
