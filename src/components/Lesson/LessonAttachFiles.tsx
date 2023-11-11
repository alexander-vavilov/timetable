import { ChangeEvent, FC, useState } from 'react'
import { MdAttachFile } from 'react-icons/md'
import UploadModal from '../Modals/UploadModal'

const LessonAttachFiles: FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const uploadFilesLocally = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setFiles([...files, ...e.target.files])
    setIsUploadModalOpen(true)
  }

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false)
    setFiles([])
  }

  return (
    <>
      <div className='flex flex-col'>
        <input
          type='file'
          id='file'
          accept='image/*'
          multiple
          onChange={(e) => uploadFilesLocally(e)}
          className='hidden w-0 opacity-0'
        />
        <label
          htmlFor='file'
          className='input inline-flex max-w-max cursor-pointer items-center rounded-md border-2 hover:border-neutral-700 hover:bg-neutral-700'
        >
          <MdAttachFile size={20} />
          <span>Прикрепить файлы</span>
        </label>
        <span className='text-xs text-neutral-400'>
          (изображения и любые другие виды файлов)
        </span>
      </div>
      <UploadModal
        isOpen={isUploadModalOpen}
        handleClose={handleCloseUploadModal}
        files={files}
        setFiles={setFiles}
      />
    </>
  )
}

export default LessonAttachFiles
