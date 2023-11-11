import { FC, useState } from 'react'
import ImagesViewer from '../ImagesViewer/ImageViewer'

interface ILessonAttachmentsProps {
  filesURL: string[]
}

const LessonAttachments: FC<ILessonAttachmentsProps> = ({ filesURL }) => {
  const [viewedImageURL, setViewedImageURL] = useState<string | null>(null)

  return (
    <div className='flex flex-wrap gap-2'>
      {filesURL?.map((fileURL) => (
        <div
          key={fileURL}
          className='h-32 w-32 cursor-pointer overflow-hidden rounded-md'
        >
          <img
            src={fileURL}
            onClick={() => setViewedImageURL(fileURL)}
            className='h-full w-full bg-gray-500 object-cover object-center'
          />
        </div>
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

export default LessonAttachments
