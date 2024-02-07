import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FC } from 'react'

import { auth } from '../../firebase'
import Form from '../components/Form/Form'
import { handleSubmitFn } from '../types'

const Register: FC = () => {
  const handleSubmit: handleSubmitFn = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  return (
    <Form title="Регистрация" type="register" handleSubmit={handleSubmit} />
  )
}

export default Register
