import { ForwardedRef, forwardRef } from 'react'
import { createPortal } from 'react-dom'

const ContextMenu = forwardRef((_, ref: ForwardedRef<HTMLDivElement>) => {
  const element = document.getElementById('context-menu')

  if (!element) return
  return createPortal(
    <div
      ref={ref}
      className='absolute z-50'
      onContextMenu={(e) => e.preventDefault()}
    >
      <ul className='overflow-hidden rounded-md bg-neutral-900 py-1 shadow-md'>
        <li className='cursor-pointer px-4 py-1 hover:bg-neutral-800'>
          some content
        </li>
        <li className='cursor-pointer px-4 py-1 hover:bg-neutral-800'>
          some content
        </li>
        <li className='cursor-pointer px-4 py-1 hover:bg-neutral-800'>
          some content
        </li>
      </ul>
    </div>,
    element
  )
})

export default ContextMenu
