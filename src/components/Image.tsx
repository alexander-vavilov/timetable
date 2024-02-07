import { FC, useState } from 'react'

import { cn } from '../utils'
import Spinner from './Spinner'

interface ImageProps {
  src: string
  onClick?: () => void
  className?: string
}

const Image: FC<ImageProps> = ({ src, onClick, className }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className={cn('relative h-32 w-32 overflow-hidden rounded-md', className)}
    >
      <img
        onClick={onClick}
        src={src}
        onLoad={() => setIsLoading(false)}
        className="h-full w-full overflow-hidden object-cover object-center"
        draggable={false}
        alt="img"
      />
      {isLoading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-700">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Image
