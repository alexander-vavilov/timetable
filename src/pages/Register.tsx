import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FC } from 'react'
import { toast } from 'sonner'

import { auth } from '../../firebase'
import Form from '../components/Form/Form'
import { handleSubmitFn } from '../types'

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
    <Form title="Регистрация" type="register" handleSubmit={handleSubmit} />
  )
}

export default Register
