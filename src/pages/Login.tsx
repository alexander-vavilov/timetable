import { signInWithEmailAndPassword } from 'firebase/auth'
import { FC } from 'react'
import { toast } from 'sonner'

import { auth } from '../../firebase'
import Form from '../components/Form/Form'
import { handleSubmitFn } from '../types'

const Login: FC = () => {
  const handleSubmit: handleSubmitFn = async (
    email,
    password,
    setIsLoading
  ) => {
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

  return <Form title="Войти" type="login" handleSubmit={handleSubmit} />
}

export default Login
