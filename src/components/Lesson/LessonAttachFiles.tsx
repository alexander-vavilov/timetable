import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { MdAttachFile } from 'react-icons/md'
import UploadModal from '../Modals/UploadModal'

interface LessonAttachFilesProps {
  setUploadedFiles: Dispatch<SetStateAction<File[]>>
}

const LessonAttachFiles: FC<LessonAttachFilesProps> = ({
  setUploadedFiles
}) => {
  const [files, setFiles] = useState<File[]>([])

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const filesArr = [...e.target.files]
    setFiles((files) => [...files, ...filesArr])
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
      <UploadModal
        isOpen={files.length > 0}
        handleClose={() => setFiles([])}
        files={files}
        setUploadedFiles={setUploadedFiles}
      />
    </>
  )
}

export default LessonAttachFiles
