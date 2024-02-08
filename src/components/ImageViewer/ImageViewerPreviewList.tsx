import { Dispatch, FC, SetStateAction } from 'react'

import { firebaseFile } from '../../types'

interface ImageViewerPreviewListProps {
  images: firebaseFile[]
  setViewedImageIndex: Dispatch<SetStateAction<number | null>>
}

const ImageViewerPreviewList: FC<ImageViewerPreviewListProps> = ({
  images,
  setViewedImageIndex
}) => {
  const handleClick = (imageURL: string) => {
    const imageIndex = images.findIndex(({ url }) => url === imageURL)
    setViewedImageIndex(imageIndex)
  }

  return (
    <div className="absolute bottom-0 left-1/2 z-10 hidden max-w-64 -translate-x-1/2 justify-center gap-1 overflow-x-scroll py-4 md:flex">
      {images.map(({ fullPath, url }) => (
        <div
          key={fullPath}
          onClick={() => handleClick(url)}
          className="cursor-pointer"
        >
          <img
            src={url}
            className="h-14 w-full max-w-7 object-cover object-center"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageViewerPreviewList
