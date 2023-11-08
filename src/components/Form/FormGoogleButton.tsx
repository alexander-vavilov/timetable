import { FC, ButtonHTMLAttributes } from 'react'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'
import { UserCredential, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../../firebase'
import { cn } from '../../utils'

interface IFormGoogleButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	handleAuth: (callback: () => Promise<UserCredential>) => void
}

const FormGoogleButton: FC<IFormGoogleButton> = ({
	handleAuth,
	className,
	...props
}) => {
	const handleSignInWithGoogle = async () => {
		handleAuth(() => signInWithPopup(auth, provider))
	}

	return (
		<Button
			onClick={handleSignInWithGoogle}
			className={cn(
				'flex items-center justify-center gap-2 border-2 bg-transparent transition-colors hover:bg-gray-200 dark:border-none dark:border-gray-200 dark:bg-white',
				className
			)}
			{...props}
		>
			<FcGoogle size={22} />
			<span className='font-medium text-black/80'>Войти с Google</span>
		</Button>
	)
}

export default FormGoogleButton
