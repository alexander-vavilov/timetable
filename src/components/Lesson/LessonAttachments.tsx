import { FC, useState } from 'react'
import ImagesViewer from '../ImagesViewer/ImageViewer'
import TextInfo from '../TextInfo'

const LessonAttachments: FC<{ filesURL: string[] }> = ({ filesURL }) => {
  const [viewedImageURL, setViewedImageURL] = useState<string | null>(null)

  return (
    <div className='flex flex-col'>
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
      <TextInfo>
        Внимание! Файлы автоматически удаляются спустя 7 дней после даты их
        добавления с целью экономии места на серверном хранилище.
      </TextInfo>
    </div>
  )
}

export default LessonAttachments
