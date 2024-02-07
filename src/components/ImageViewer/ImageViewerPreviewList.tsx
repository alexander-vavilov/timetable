import { Dispatch, FC, SetStateAction } from 'react'

interface ImageViewerPreviewListProps {
  imageURLs: string[]
  setViewedImageIndex: Dispatch<SetStateAction<number | null>>
}

const ImageViewerPreviewList: FC<ImageViewerPreviewListProps> = ({
  imageURLs,
  setViewedImageIndex
}) => {
  const handleClick = (imageURL: string) => {
    const imageIndex = imageURLs.findIndex((image) => image === imageURL)
    setViewedImageIndex(imageIndex)
  }

  return (
    <div className="absolute bottom-0 left-1/2 z-10 hidden max-w-64 -translate-x-1/2 justify-center gap-1 overflow-x-scroll py-4 md:flex">
      {imageURLs.map((imageURL) => (
        <div
          key={imageURL}
          onClick={() => handleClick(imageURL)}
          className="cursor-pointer"
        >
          <img
            src={imageURL}
            className="h-14 w-full max-w-7 object-cover object-center"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageViewerPreviewList
