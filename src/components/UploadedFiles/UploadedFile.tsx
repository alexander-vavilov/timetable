import { FC, useState } from 'react'
import { MdClose } from 'react-icons/md'
import Spinner from '../Spinner'

interface UploadedFileProps {
  file: File
  handleDeleteFile: () => void
  onClick: () => void
}

const UploadedFile: FC<UploadedFileProps> = ({
  file,
  handleDeleteFile,
  onClick
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const url = URL.createObjectURL(file)

  return (
    <div className='group relative flex-auto'>
      <div className='relative overflow-hidden rounded-md'>
        {isLoading && (
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-700'>
            <Spinner />
          </div>
        )}
        <img
          src={url}
          onClick={onClick}
          className='max-h-40 min-h-[60px] w-full max-w-full cursor-pointer object-cover object-center'
          onLoad={() => setIsLoading(false)}
          alt={file.name}
        />
      </div>
      <div className='absolute -right-2 -top-2 transition-all cursor:invisible cursor:scale-75 cursor:opacity-0 cursor:group-hover:visible cursor:group-hover:scale-100 cursor:group-hover:opacity-100'>
        <button
          onClick={handleDeleteFile}
          className='rounded-full bg-gray-300 p-0.5 transition-colors hover:bg-gray-400 dark:bg-neutral-700 hover:dark:bg-neutral-600'
        >
          <MdClose size={18} />
        </button>
      </div>
    </div>
  )
}

export default UploadedFile
