import { FC } from 'react'
import useContextMenu from '../../hooks/useContextMenu'
import ContextMenu from '../ContextMenu/ContextMenu'

interface LessonAttachmentsItemProps {
  fileURL: string
  onClick: () => void
}

const LessonAttachmentsItem: FC<LessonAttachmentsItemProps> = ({
  fileURL,
  onClick
}) => {
  const { isOpen, ref, open } = useContextMenu()

  return (
    <div>
      <img
        src={fileURL}
        onClick={onClick}
        onContextMenu={(e) => open(e)}
        className='h-32 w-32 cursor-pointer overflow-hidden rounded-md object-cover object-center md:h-32 md:w-32'
        draggable={false}
        alt='img'
      />
      {isOpen && <ContextMenu ref={ref} />}
    </div>
  )
}

export default LessonAttachmentsItem
