import { FC, useState } from 'react'

import ImageViewer from '../ImageViewer/ImageViewer'
import TextInfo from '../TextInfo'
import LessonViewAttachmentsItem from './LessonViewAttachmentsItem'

const LessonViewAttachments: FC<{ filesURL: string[] }> = ({ filesURL }) => {
  const [viewedImageIndex, setViewedImageIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-2">
        {filesURL.map((fileURL, index) => (
          <LessonViewAttachmentsItem
            key={fileURL}
            fileURL={fileURL}
            handleOpen={() => setViewedImageIndex(index)}
          />
        ))}
        {viewedImageIndex !== null && (
          <ImageViewer
            imageURLs={filesURL}
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
