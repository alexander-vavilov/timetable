import { signInAnonymously, UserCredential } from 'firebase/auth'
import { ButtonHTMLAttributes, FC } from 'react'
import { FaUserSecret } from 'react-icons/fa'

import { auth } from '../../../firebase'
import { cn } from '../../utils'
import Button from '../Button'

interface FormAnonymousButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleAuth: (callback: () => Promise<UserCredential>) => void
}

const FormAnonymousButton: FC<FormAnonymousButtonProps> = ({
  handleAuth,
  className,
  ...props
}) => {
  const handleSignInAnonymously = async () => {
    handleAuth(() => signInAnonymously(auth))
  }

  return (
    <Button
      onClick={handleSignInAnonymously}
      className={cn(
        'flex items-center justify-center gap-2 bg-neutral-950 text-white hover:bg-neutral-900',
        className
      )}
      {...props}
    >
      <FaUserSecret size={22} />
      <span>Войти анонимно</span>
    </Button>
  )
}

export default FormAnonymousButton
