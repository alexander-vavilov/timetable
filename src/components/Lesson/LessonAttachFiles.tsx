import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { MdAttachFile } from 'react-icons/md'
import AttachModal from '../Modals/AttachModal'

interface LessonAttachFilesProps {
  setAttachedFiles: Dispatch<SetStateAction<File[]>>
}

const LessonAttachFiles: FC<LessonAttachFilesProps> = ({
  setAttachedFiles
}) => {
  const [currentFiles, setCurrentFiles] = useState<File[]>([])

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const filesArr = [...e.target.files]
    setCurrentFiles((files) => [...files, ...filesArr])
  }

  return (
    <>
      <div className='flex flex-col'>
        <input
          type='file'
          id='file'
          accept='image/*'
          multiple
          onChange={(e) => addFiles(e)}
          className='hidden w-0 opacity-0'
        />
        <label
          htmlFor='file'
          className='input inline-flex max-w-max cursor-pointer items-center gap-1 rounded-md border-2 pl-1 hover:border-neutral-700 hover:bg-neutral-700'
        >
          <MdAttachFile size={20} />
          <span>Прикрепить изображения</span>
        </label>
      </div>
      <AttachModal
        isOpen={currentFiles.length > 0}
        handleClose={() => setCurrentFiles([])}
        currentFiles={currentFiles}
        setCurrentFiles={setCurrentFiles}
        setAttachedFiles={setAttachedFiles}
      />
    </>
  )
}

export default LessonAttachFiles
