import { FC, useState } from 'react'

import { firebaseFile } from '../../types'
import ImageViewer from '../ImageViewer/ImageViewer'
import TextInfo from '../TextInfo'
import LessonViewAttachmentsItem from './LessonViewAttachmentsItem'

const LessonViewAttachments: FC<{ files: firebaseFile[] }> = ({ files }) => {
  const [viewedImageIndex, setViewedImageIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col border-t border-gray-200 pt-4 dark:border-neutral-500">
      <div className="flex flex-wrap gap-2">
        {files.map((file, index) => (
          <LessonViewAttachmentsItem
            key={file.fullPath}
            file={file}
            handleOpen={() => setViewedImageIndex(index)}
          />
        ))}
        {viewedImageIndex !== null && (
          <ImageViewer
            images={files}
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
