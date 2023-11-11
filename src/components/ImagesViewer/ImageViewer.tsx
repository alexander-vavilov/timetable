import { Dispatch, FC, SetStateAction, WheelEvent, useState } from 'react'
import { createPortal } from 'react-dom'
import Overlay from '../Overlay'
import { HiDownload } from 'react-icons/hi'
import { AiOutlineRotateRight } from 'react-icons/ai'
import CloseButton from '../CloseButton'
import { useClickAway } from '../../hooks/useClickAway'

interface IImagesViewer {
  viewedImageURL: string
  setViewedImageURL: Dispatch<SetStateAction<string | null>>
}

const ImagesViewer: FC<IImagesViewer> = ({
  viewedImageURL,
  setViewedImageURL
}) => {
  const element = document.getElementById('modal')

  const [rotationValue, setRotationValue] = useState(0)
  const [scaleValue, setScaleValue] = useState(1)

  const rotateImage = () => {
    setRotationValue((prevValue) => {
      const newValue = prevValue + 90

      if (newValue >= 360) return 0
      return newValue
    })
  }

  const changeScaleOnWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      setScaleValue((prevValue) => prevValue + 0.2)
    } else {
      if (scaleValue <= 0.4) return
      setScaleValue((prevValue) => prevValue - 0.2)
    }
  }

  const handleClose = () => setViewedImageURL(null)

  if (!element) return
  return createPortal(
    <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center'>
      <div
        onWheel={(e) => changeScaleOnWheel(e)}
        style={{ rotate: `${rotationValue}deg`, scale: `${scaleValue}` }}
        className='z-20'
      >
        <img
          src={viewedImageURL}
          className='max-w-full select-none overflow-hidden sm:max-w-2xl lg:max-w-4xl'
        />
      </div>
      <div className='fixed right-0 top-0 z-20 p-5'>
        <CloseButton onClick={handleClose} />
      </div>
      <div className='fixed bottom-0 right-0 z-20 flex w-full items-center justify-end p-3 backdrop-blur-md lg:w-auto lg:backdrop-blur-none'>
        <a
          href={viewedImageURL}
          className='image-viewer-button'
          target='_blank'
        >
          <HiDownload size={24} />
        </a>
        <button onClick={rotateImage} className='image-viewer-button'>
          <AiOutlineRotateRight size={24} />
        </button>
      </div>
      <Overlay onClick={handleClose} className='bg-black/60' />
    </div>,
    element
  )
}

export default ImagesViewer
