import { FC } from 'react'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'

const FormGoogleButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      variant='button'
      onClick={onClick}
      className='flex items-center justify-center gap-2 border-2 bg-transparent transition-colors hover:bg-gray-200 dark:border-none dark:border-gray-200 dark:bg-white'
    >
      <FcGoogle size={22} />
      <span className='font-medium text-black/80'>Войти с Google</span>
    </Button>
  )
}

export default FormGoogleButton
