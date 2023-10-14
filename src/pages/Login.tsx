import { FC } from 'react'
import Form from '../components/Form/Form'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { handleSubmitFunction } from '../types'
import { toast } from 'sonner'

const Login: FC = () => {
  const handleSubmit = async ({
    email,
    password,
    setIsLoading
  }: handleSubmitFunction) => {
    setIsLoading(true)

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return user
    } catch (error) {
      toast.error('Что-то пошло не так...')
    } finally {
      setIsLoading(false)
    }
  }

  return <Form title='Войти' type='login' handleSubmit={handleSubmit} />
}

export default Login
