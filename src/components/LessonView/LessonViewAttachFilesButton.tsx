import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { MdAttachFile } from 'react-icons/md'

interface LessonViewAttachFilesButtonProps {
  setUnprocessedFiles: Dispatch<SetStateAction<File[]>>
}

const LessonViewAttachFilesButton: FC<LessonViewAttachFilesButtonProps> = ({
  setUnprocessedFiles
}) => {
  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const filesArr = [...e.target.files]
    setUnprocessedFiles((files) => [...files, ...filesArr])
  }

  return (
    <div className="flex flex-col">
      <input
        type="file"
        id="file"
        accept="image/*"
        multiple
        onChange={(e) => addFiles(e)}
        className="hidden w-0 opacity-0"
      />
      <label
        htmlFor="file"
        className="input inline-flex max-w-max cursor-pointer items-center gap-1 rounded-md border-2 pl-1 hover:border-gray-200 hover:bg-gray-200 hover:dark:border-neutral-700 hover:dark:bg-neutral-700"
      >
        <MdAttachFile size={20} />
        <span>Прикрепить изображения</span>
      </label>
    </div>
  )
}

export default LessonViewAttachFilesButton
