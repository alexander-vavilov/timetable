import { FC } from 'react'
import Button from '../Button'
import { FaUserSecret } from 'react-icons/fa'

const FormAnonymousButton: FC<{ onClick: () => void }> = ({ onClick }) => {
	return (
		<Button
			onClick={onClick}
			className='flex items-center justify-center gap-2 bg-neutral-950 text-white'
		>
			<FaUserSecret size={22} />
			<span>Войти анонимно</span>
		</Button>
	)
}

export default FormAnonymousButton
