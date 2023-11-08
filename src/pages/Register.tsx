import { FC } from 'react'
import Form from '../components/Form/Form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { handleSubmitFn } from '../types'
import { toast } from 'sonner'

const Register: FC = () => {
	const handleSubmit: handleSubmitFn = async (
		email,
		password,
		setIsLoading
	) => {
		setIsLoading(true)

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			return user
		} catch (error) {
			toast.error('Что-то пошло не так...')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form title='Регистрация' type='register' handleSubmit={handleSubmit} />
	)
}

export default Register
