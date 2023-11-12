import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Overlay from '../Overlay'
import CloseButton from '../CloseButton'
import { useGesture } from '@use-gesture/react'
import { AiOutlineRotateRight } from 'react-icons/ai'

interface ImagesViewerProps {
  viewedImageURL: string
  setViewedImageURL: Dispatch<SetStateAction<string | null>>
}

const ImagesViewer: FC<ImagesViewerProps> = ({
  viewedImageURL,
  setViewedImageURL
}) => {
  const element = document.getElementById('modal')
  const imageRef = useRef<HTMLImageElement>(null)

  const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1, rotate: 0 })

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setCrop((crop) => ({ ...crop, x, y }))
      },
      onPinch: ({ offset: [scale] }) => {
        setCrop((crop) => ({ ...crop, scale }))
      }
    },
    {
      target: imageRef,
      pinch: { scaleBounds: { min: 0.6, max: 3.6 } }
    }
  )

  const rotate = () => {
    setCrop((crop) => ({ ...crop, rotate: crop.rotate + 90 }))
  }

  const handleClose = () => setViewedImageURL(null)

  if (!element) return
  return createPortal(
    <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center overflow-hidden'>
      <img
        ref={imageRef}
        src={viewedImageURL}
        className='relative z-20 max-h-[80%] max-w-full cursor-move touch-none select-none'
        draggable={false}
        style={{
          left: crop.x,
          top: crop.y,
          transform: `scale(${crop.scale}) rotate(${crop.rotate}deg)`
        }}
      />
      <div className='fixed right-0 top-0 z-20 p-4'>
        <CloseButton onClick={handleClose} />
      </div>
      <div className='fixed bottom-0 right-0 z-20 p-4'>
        <button
          onClick={rotate}
          className='rounded-full p-2 text-neutral-500 transition-colors touch:text-white cursor:hover:bg-neutral-700/50 cursor:hover:text-neutral-300'
        >
          <AiOutlineRotateRight size={24} />
        </button>
      </div>
      <Overlay onClick={handleClose} className='bg-black/60' />
    </div>,
    element
  )
}

export default ImagesViewer
