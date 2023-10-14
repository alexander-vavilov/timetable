import { FC } from 'react'

const FormDivider: FC = () => {
  return (
    <div className='flex items-center py-4'>
      <hr className='flex-auto border-neutral-400/70' />
      <span className='px-2 text-neutral-400'>Или</span>
      <hr className='flex-auto border-neutral-400/70' />
    </div>
  )
}

export default FormDivider
