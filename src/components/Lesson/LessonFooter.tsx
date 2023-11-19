import { FC } from 'react'
import Button from '../Button'
import TextInfo from '../TextInfo'

interface LessonFooterProps {
  handleSave: () => void
  progress: number
}

const LessonFooter: FC<LessonFooterProps> = ({ handleSave, progress }) => {
  return (
    <div className='flex items-center justify-end gap-4 border-t border-gray-300 p-4 text-white shadow-md dark:border-neutral-700 dark:shadow-none'>
      {progress > 0 && (
        <div className='flex flex-col'>
          <div className='relative h-1 w-full max-w-xs overflow-hidden rounded-full bg-neutral-500'>
            <div
              className='absolute left-0 top-0 h-full bg-green-500'
              style={{ width: `${progress}%` }}
            />
          </div>
          <TextInfo>Дождитесь окончания загрузки файлов.</TextInfo>
        </div>
      )}
      <Button onClick={handleSave}>Сохранить</Button>
    </div>
  )
}

export default LessonFooter
