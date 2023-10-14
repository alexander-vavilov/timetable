import { FC } from 'react'
import { Link } from 'react-router-dom'

const FormLink: FC<{ type: 'register' | 'login' }> = ({ type }) => {
  return (
    <Link to={type === 'register' ? '/login' : '/register'}>
      {type === 'register'
        ? 'Уже зарегистрированы? '
        : 'Еще не зарегистрированы? '}
      <span className='text-green-500 hover:underline'>
        {type === 'register' ? 'Войти' : 'Создать аккаунт'}
      </span>
    </Link>
  )
}

export default FormLink
