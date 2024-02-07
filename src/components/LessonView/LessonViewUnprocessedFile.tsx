import { FC } from 'react'
import { MdClose } from 'react-icons/md'

import Image from '../Image'

interface LessonViewUnprocessedFileProps {
  file: File
  handleDelete: () => void
}

const LessonViewUnprocessedFile: FC<LessonViewUnprocessedFileProps> = ({
  file,
  handleDelete
}) => {
  const fileURL = URL.createObjectURL(file)

  return (
    <div className="relative max-w-max">
      <Image src={fileURL} className="h-20 w-20 cursor-default" />
      <button
        onClick={handleDelete}
        className="image-button absolute right-0.5 top-0.5 p-0.5"
      >
        <MdClose size={18} />
      </button>
    </div>
  )
}

export default LessonViewUnprocessedFile
