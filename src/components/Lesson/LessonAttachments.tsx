import { FC, useState } from 'react'
import ImagesViewer from '../ImagesViewer/ImageViewer'
import TextInfo from '../TextInfo'

const LessonAttachments: FC<{ filesURL: string[] }> = ({ filesURL }) => {
  const [viewedImageIndex, setViewedImageIndex] = useState<number>(-1)

  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-2'>
        {filesURL.map((fileURL, index) => (
          <img
            key={fileURL}
            src={fileURL}
            onClick={() => setViewedImageIndex(index)}
            className='h-32 w-32 cursor-pointer overflow-hidden rounded-md object-cover object-center md:h-32 md:w-32'
            loading='lazy'
            alt='img'
          />
        ))}
        {viewedImageIndex >= 0 && (
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

export default LessonAttachments
