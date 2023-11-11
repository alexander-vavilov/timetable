import { Dispatch, FC, SetStateAction } from 'react'
import { MdDeleteOutline } from 'react-icons/md'

interface IUploadedFile {
  file: File
  handleDeleteFile: () => void
  setViewedImageURL: Dispatch<SetStateAction<string | null>>
}

const UploadedFile: FC<IUploadedFile> = ({
  file,
  handleDeleteFile,
  setViewedImageURL
}) => {
  const blob = new Blob([file], { type: file.type })
  const url = URL.createObjectURL(blob)

  return (
    <div className='relative'>
      <img
        src={url}
        onClick={() => setViewedImageURL(url)}
        className='max-h-40 min-h-[60px] w-full max-w-full cursor-pointer rounded-md object-cover object-center'
        alt={file.name}
      />
      <div className='absolute right-0 top-0'>
        <button
          onClick={handleDeleteFile}
          className='m-1 rounded-full border-2 border-neutral-600 bg-neutral-900 p-1 transition-all hover:scale-105 hover:text-red-500'
        >
          <MdDeleteOutline size={18} />
        </button>
      </div>
    </div>
  )
}

export default UploadedFile
