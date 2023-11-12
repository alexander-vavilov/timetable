import { FC, useState } from 'react'
import ImagesViewer from '../ImagesViewer/ImageViewer'

interface LessonAttachmentsProps {
  filesURL: string[]
}

const LessonAttachments: FC<LessonAttachmentsProps> = ({ filesURL }) => {
  const [viewedImageURL, setViewedImageURL] = useState<string | null>(null)

  return (
    <div className='flex flex-wrap gap-2'>
      {filesURL.map((fileURL) => (
        <img
          key={fileURL}
          src={fileURL}
          width={128}
          height={128}
          onClick={() => setViewedImageURL(fileURL)}
          className='h-32 w-32 cursor-pointer overflow-hidden rounded-md object-cover object-center'
          loading='lazy'
          alt='img'
        />
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
