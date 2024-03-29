import { Dispatch, FC, SetStateAction } from 'react'

import LessonViewUnprocessedFile from './LessonViewUnprocessedFile'

interface LessonViewUnprocessedFilesProps {
  files: File[] | FileList
  setUnprocessedFiles: Dispatch<SetStateAction<File[]>>
}

const LessonViewUnprocessedFiles: FC<LessonViewUnprocessedFilesProps> = ({
  files,
  setUnprocessedFiles
}) => {
  const handleDelete = (index: number) => {
    const filteredFiles = [...files].filter((_, idx) => index !== idx)
    setUnprocessedFiles(filteredFiles)
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {[...files].map((file, index) => {
        return (
          <LessonViewUnprocessedFile
            key={file.name}
            file={file}
            handleDelete={() => handleDelete(index)}
          />
        )
      })}
    </div>
  )
}

export default LessonViewUnprocessedFiles
