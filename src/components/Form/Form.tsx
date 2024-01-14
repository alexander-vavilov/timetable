import { FC, FormEvent, useContext, useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { UserContext } from '../../contexts/UserContext'
import { handleSubmitFn } from '../../types'
import { IUserContext } from '../../types/contexts'
import { Navigate } from 'react-router-dom'
import { UserCredential } from 'firebase/auth'
import FormLoading from './FormLoading'
import FormGoogleButton from './FormGoogleButton'
import FormAnonymousButton from './FormAnonymousButton'
import FormDivider from './FormDivider'
import Logo from '../Logo'
import FormLink from './FormLink'
import { toast } from 'sonner'

interface FormProps {
	title: string
	type: 'register' | 'login'
	handleSubmit: handleSubmitFn
}

const Form: FC<FormProps> = ({ title, type, handleSubmit }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { currentUser } = useContext(UserContext) as IUserContext

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		handleSubmit(email, password, setIsLoading)
	}
	const handleAuth = async (callback: () => Promise<UserCredential>) => {
		setIsLoading(true)

		try {
			await callback()
		} catch (error) {
			toast.error('Что-то пошло не так...')
		} finally {
			setIsLoading(false)
		}
	}

	if (currentUser) return <Navigate to='/' />

	return (
		<div className='flex h-d-screen w-full items-center justify-center bg-gray-200 dark:bg-neutral-950'>
			<div className='relative flex h-full w-full flex-col justify-center overflow-hidden rounded-md bg-white p-6 dark:bg-neutral-800 sm:h-auto sm:max-w-sm'>
				<div className='-mt-4 py-8 text-center'>
					<Logo size={36} />
				</div>
				<form onSubmit={onSubmit} className='flex flex-col gap-4'>
					<Input
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Эл. Почта'
					/>
					<Input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='пароль'
					/>
					<Button type='submit' disabled={isLoading} className='text-white'>
						{title}
					</Button>
				</form>
				<FormDivider />
				<div className='flex flex-col gap-2'>
					<FormGoogleButton handleAuth={handleAuth} disabled={isLoading} />
					<FormAnonymousButton handleAuth={handleAuth} disabled={isLoading} />
				</div>
				<div className='mt-4 border-t border-neutral-400/70 pt-4 text-center'>
					<FormLink type={type} />
				</div>
				{isLoading && <FormLoading />}
			</div>
		</div>
	)
}

export default Form
