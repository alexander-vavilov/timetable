import { FC, HTMLAttributes, useState } from 'react'

import { cn } from '../utils'
import Spinner from './Spinner'

interface ImageProps
  extends Omit<HTMLAttributes<HTMLImageElement>, 'className'> {
  src: string
  className?: {
    wrapper?: string
    image?: string
  }
}

const Image: FC<ImageProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className={cn(
        'relative h-32 w-32 overflow-hidden rounded-md',
        className?.wrapper
      )}
    >
      <img
        onLoad={() => setIsLoading(false)}
        className={cn(
          'h-full w-full overflow-hidden object-cover object-center',
          className?.image
        )}
        draggable={false}
        alt="img"
        {...props}
      />
      {isLoading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300 dark:bg-neutral-700">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default Image
