import { useGesture } from '@use-gesture/react'
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { AiOutlineDownload, AiOutlineRotateRight } from 'react-icons/ai'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight
} from 'react-icons/md'

import { useKeyDown } from '../../hooks/useKeyDown'
import { FirebaseFile } from '../../types/storage'
import CloseButton from '../CloseButton'
import Image from '../Image'
import ModalPortal from '../Modal/ModalPortal'
import Spinner from '../Spinner'
import TextInfo from '../TextInfo'
import ImageViewerPreviewList from './ImageViewerPreviewList'

interface ImagesViewerProps {
  images: FirebaseFile[]
  viewedImageIndex: number
  setViewedImageIndex: Dispatch<SetStateAction<number | null>>
}

const ImagesViewer: FC<ImagesViewerProps> = ({
  images,
  viewedImageIndex,
  setViewedImageIndex
}) => {
  const ref = useRef<HTMLImageElement>(null)

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onWheel: ({ active, ctrlKey, direction: [_, direction] }) => {
        if (active && !ctrlKey) {
          if (direction < 0) previous()
          if (direction > 0) next()
        }
      }
    },
    {
      target: ref,
      pinch: { scaleBounds: { min: 1, max: 4 } }
    }
  )

  const isFirstItem = viewedImageIndex === 0
  const isLastItem = viewedImageIndex + 1 === images.length

  const previous = () => {
    if (isFirstItem) return

    setViewedImageIndex(viewedImageIndex - 1)
    setCrop(defaultCrop)
  }
  const next = () => {
    if (isLastItem) return

    setViewedImageIndex(viewedImageIndex + 1)
    setCrop(defaultCrop)
  }

  const rotate = () => {
    setCrop((crop) => ({ ...crop, rotate: crop.rotate + 90 }))
  }

  useKeyDown((e) => {
    if (e.key === 'ArrowLeft') previous()
    if (e.key === 'ArrowRight') next()
  })

  const handleClose = () => setViewedImageIndex(null)

  return (
    <ModalPortal
      onRequestClose={handleClose}
      className={{
        overlay: 'flex items-center justify-center backdrop-blur-sm',
        modal: 'max-w-5xl'
      }}
    >
      {/* {isLoading && (
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <Spinner size={30} />
        </div>
      )} */}
      <img
        ref={ref}
        src={images[viewedImageIndex].url}
        onLoad={() => setIsLoading(false)}
        className="relative h-full w-full touch-none"
        draggable={false}
        style={{
          left: crop.x,
          top: crop.y,
          transform: `scale(${crop.scale}) rotate(${crop.rotate}deg)`
        }}
      />
      <ImageViewerPreviewList
        images={images}
        setViewedImageIndex={setViewedImageIndex}
      />
      <CloseButton
        onClick={handleClose}
        className="absolute right-0 top-0 z-10 p-4"
      />
      <TextInfo className="pointer-events-none absolute bottom-4 left-4 select-none font-medium">
        Изображение {viewedImageIndex + 1} из {images.length}
      </TextInfo>
      <div className="absolute bottom-4 right-4 z-10 flex gap-1">
        <button onClick={rotate} className="image-viewer-button">
          <AiOutlineRotateRight size={24} />
        </button>
        <a
          href={images[viewedImageIndex].url}
          target="_blank"
          download
          className="image-viewer-button"
        >
          <AiOutlineDownload size={24} />
        </a>
      </div>
      {!isFirstItem && (
        <button
          onClick={previous}
          className="group absolute left-0 top-0 h-full px-2 md:px-6"
        >
          <div className="rounded-full p-1 transition-colors duration-300 cursor:text-white/60 cursor:group-hover:bg-neutral-500/30 cursor:group-hover:text-white">
            <MdOutlineKeyboardArrowLeft size={32} />
          </div>
        </button>
      )}
      {!isLastItem && (
        <button
          onClick={next}
          className="group absolute right-0 top-0 h-full px-2 md:px-6"
        >
          <div className="rounded-full p-1 transition-colors duration-300 cursor:text-white/60 cursor:group-hover:bg-neutral-500/30 cursor:group-hover:text-white">
            <MdOutlineKeyboardArrowRight size={32} />
          </div>
        </button>
      )}
    </ModalPortal>
  )
}

export default ImagesViewer
