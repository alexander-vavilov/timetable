import { forwardRef, HTMLAttributes, useState } from 'react'

import { cn } from '../utils'
import Spinner from './Spinner'

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  width?: number
  height?: number
  classNames?: {
    wrapper?: string
    imageElement?: string
  }
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, width, height, classNames, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
      <div
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-md',
          classNames?.wrapper
        )}
        style={{
          width: `${width}px`,
          height: `${height}px`
        }}
      >
        <img
          ref={ref}
          src={src}
          onLoad={() => setIsLoading(false)}
          className={cn(
            'h-full w-full overflow-hidden object-cover object-center',
            classNames?.imageElement
          )}
          draggable={false}
          alt="img"
          {...props}
        />
        {isLoading && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-700">
            <Spinner />
          </div>
        )}
      </div>
    )
  }
)

export default Image
