import { FC, HTMLAttributes, useState } from 'react'
import { MdErrorOutline } from 'react-icons/md'

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
  const [isError, setIsError] = useState(false)

  return (
    <div
      className={cn(
        'relative h-32 w-32 select-none overflow-hidden rounded-md',
        className?.wrapper
      )}
    >
      <img
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setIsError(true)
        }}
        className={cn(
          'h-full w-full overflow-hidden object-cover object-center',
          className?.image
        )}
        draggable={false}
        alt="img"
        {...props}
      />
      {(isLoading || isError) && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-300 dark:bg-neutral-700">
          {isLoading && <Spinner />}
          {isError && (
            <div className="flex flex-col items-center justify-center p-1 text-center">
              <MdErrorOutline size={28} />
              <span className="text-xs">Не удалось загрузить изображение.</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Image
