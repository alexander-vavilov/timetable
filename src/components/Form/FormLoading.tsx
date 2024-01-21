import { FC } from 'react'

import Spinner from '../Spinner'

const FormLoading: FC = () => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500/40 dark:bg-black/30">
      <Spinner />
    </div>
  )
}

export default FormLoading
