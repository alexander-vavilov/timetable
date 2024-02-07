import { signInWithEmailAndPassword } from 'firebase/auth'
import { FC } from 'react'

import { auth } from '../../firebase'
import Form from '../components/Form/Form'
import { handleSubmitFn } from '../types'

const Login: FC = () => {
  const handleSubmit: handleSubmitFn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  return <Form title="Войти" type="login" handleSubmit={handleSubmit} />
}

export default Login
