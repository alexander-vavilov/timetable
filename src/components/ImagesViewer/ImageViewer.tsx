import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { useGesture } from '@use-gesture/react'
import { AiOutlineDownload, AiOutlineRotateRight } from 'react-icons/ai'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md'
import CloseButton from '../CloseButton'
import TextInfo from '../TextInfo'
import Spinner from '../Spinner'
import ReactModal from 'react-modal'
import Overlay from '../Overlay'
import { useKeyDown } from '../../hooks/useKeyDown'
import Image from '../Image'

interface ImagesViewerProps {
  filesURL: string[]
  viewedImageIndex: number
  setViewedImageIndex: Dispatch<SetStateAction<number | null>>
}

const ImagesViewer: FC<ImagesViewerProps> = ({
  filesURL,
  viewedImageIndex,
  setViewedImageIndex
}) => {
  const imageRef = useRef<HTMLImageElement>(null)

  const viewedImageURL = filesURL[viewedImageIndex]
  const [isLoading, setIsLoading] = useState(true)

  const defaultCrop = { x: 0, y: 0, scale: 1, rotate: 0 }
  const [crop, setCrop] = useState(defaultCrop)

  useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setCrop((crop) => ({ ...crop, x, y }))
      },
      onPinch: ({ offset: [scale] }) => {
        setCrop((crop) => ({ ...crop, scale }))
      },
      onWheel: ({ active, ctrlKey, direction: [_, direction] }) => {
        if (active && !ctrlKey) {
          if (direction < 0) previous()
          if (direction > 0) next()
        }
      }
    },
    {
      target: imageRef,
      pinch: { scaleBounds: { min: 1, max: 4 } }
    }
  )

  const isFirstItem = viewedImageIndex === 0
  const isLastItem = viewedImageIndex === filesURL.length - 1

  const previous = () => {
    setViewedImageIndex((prevIndex) => {
      if (isFirstItem || prevIndex === null) return prevIndex
      return prevIndex - 1
    })
    setCrop(defaultCrop)
  }
  const next = () => {
    setViewedImageIndex((prevIndex) => {
      if (isLastItem || prevIndex === null) return prevIndex
      return prevIndex + 1
    })
    setCrop(defaultCrop)
  }

  const rotate = () => {
    setCrop((crop) => ({ ...crop, rotate: crop.rotate + 90 }))
  }

  const handleClose = () => setViewedImageIndex(null)

  useKeyDown((e) => {
    if (e.key === 'ArrowLeft') previous()
    if (e.key === 'ArrowRight') next()
  })

  return (
    <ReactModal
      isOpen={viewedImageIndex !== null}
      onRequestClose={handleClose}
      className='fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center outline-none'
      overlayClassName='bg-transparent'
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
    >
      {isLoading && (
        <div className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
          <Spinner size={30} />
        </div>
      )}
      <img
        ref={imageRef}
        src={viewedImageURL}
        onLoad={() => setIsLoading(false)}
        className='relative z-20 max-h-[80%] max-w-full cursor-move touch-none select-none'
        draggable={false}
        style={{
          left: crop.x,
          top: crop.y,
          transform: `scale(${crop.scale}) rotate(${crop.rotate}deg)`
        }}
      />
      <div className='absolute right-4 top-4 z-30'>
        <CloseButton onClick={handleClose} />
      </div>
      <div className='absolute bottom-4 right-4 z-30 flex'>
        <button onClick={rotate} className='image-viewer-button'>
          <AiOutlineRotateRight size={24} />
        </button>
        <a
          href={viewedImageURL}
          target='_blank'
          download
          className='image-viewer-button'
        >
          <AiOutlineDownload size={24} />
        </a>
      </div>
      <div className='absolute bottom-4 left-4 z-20'>
        <TextInfo className='pointer-events-none select-none font-medium'>
          Изображение {viewedImageIndex + 1} из {filesURL.length}
        </TextInfo>
      </div>
      <div className='z-20'>
        {!isFirstItem && (
          <button
            onClick={previous}
            className='group absolute left-0 top-0 h-full px-6'
          >
            <div className='image-viewer-button p-1 group-hover:bg-neutral-600/30 group-hover:text-white'>
              <MdOutlineKeyboardArrowLeft size={32} />
            </div>
          </button>
        )}
        {!isLastItem && (
          <button
            onClick={next}
            className='group absolute right-0 top-0 h-full px-6'
          >
            <div className='image-viewer-button p-1 group-hover:bg-neutral-600/30 group-hover:text-white'>
              <MdOutlineKeyboardArrowRight size={32} />
            </div>
          </button>
        )}
      </div>
      <Overlay onClick={handleClose} />
    </ReactModal>
  )
}

export default ImagesViewer
