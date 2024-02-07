import { ForwardedRef, useEffect, useRef } from 'react'

const useForwardRef = (ref: ForwardedRef<HTMLDivElement>) => {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref) return

    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  })

  return innerRef
}

export default useForwardRef
