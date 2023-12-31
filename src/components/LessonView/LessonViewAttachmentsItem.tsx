import { FC, useState } from 'react'
import { cn } from '../../utils'
import Spinner from '../Spinner'

interface LessonViewAttachmentsItemProps {
  fileURL: string
  onClick?: () => void
  className?: string
}

const LessonViewAttachmentsItem: FC<LessonViewAttachmentsItemProps> = ({
  fileURL,
  onClick,
  className
}) => {
  // const contextMenuItems = [
  //   {
  //     label: 'Скопировать ссылку',
  //     icon: MdClose,
  //     handler: () => console.log('click')
  //   },
  //   {
  //     label: 'Скопировать изображение',
  //     icon: MdClose,
  //     handler: () => console.log('click')
  //   },
  //   {
  //     label: 'Сохранить',
  //     icon: MdClose,
  //     handler: () => console.log('click')
  //   },
  //   {
  //     label: 'Удалить',
  //     icon: MdClose,
  //     handler: () => console.log('click')
  //   }
  // ]
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className={cn(
        'relative h-32 w-32 cursor-pointer overflow-hidden rounded-md',
        className
      )}
    >
      <img
        src={fileURL}
        onClick={onClick}
        // onContextMenu={(e) => open(e)}
        onLoad={() => setIsLoading(false)}
        className='h-full w-full overflow-hidden object-cover object-center'
        draggable={false}
        alt='img'
      />
      {isLoading && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-700'>
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default LessonViewAttachmentsItem
