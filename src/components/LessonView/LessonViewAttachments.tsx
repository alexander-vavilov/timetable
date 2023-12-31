import { FC, useState } from 'react'
import ImagesViewer from '../ImagesViewer/ImageViewer'
import TextInfo from '../TextInfo'
import LessonViewAttachmentsItem from './LessonViewAttachmentsItem'

const LessonViewAttachments: FC<{ filesURL: string[] }> = ({ filesURL }) => {
  const [viewedImageIndex, setViewedImageIndex] = useState<number | null>(null)

  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-2'>
        {filesURL.map((fileURL, index) => (
          <LessonViewAttachmentsItem
            key={fileURL}
            fileURL={fileURL}
            onClick={() => setViewedImageIndex(index)}
          />
        ))}
        {viewedImageIndex !== null && (
          <ImagesViewer
            filesURL={filesURL}
            viewedImageIndex={viewedImageIndex}
            setViewedImageIndex={setViewedImageIndex}
          />
        )}
      </div>
      <TextInfo>
        Внимание! Файлы автоматически удаляются спустя 7 дней после их
        добавления в целях экономии места на серверном хранилище.
      </TextInfo>
    </div>
  )
}

export default LessonViewAttachments
