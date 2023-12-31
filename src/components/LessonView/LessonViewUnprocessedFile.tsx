import { FC } from 'react'
import LessonViewAttachmentsItem from './LessonViewAttachmentsItem'
import { MdClose } from 'react-icons/md'

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
    <div className='relative max-w-max'>
      <LessonViewAttachmentsItem
        fileURL={fileURL}
        className='h-20 w-20 cursor-default'
      />
      <button onClick={handleDelete} className='absolute right-0 top-0 p-1'>
        <div className='rounded-full bg-neutral-600 p-0.5 hover:bg-neutral-500'>
          <MdClose size={18} />
        </div>
      </button>
    </div>
  )
}

export default LessonViewUnprocessedFile
