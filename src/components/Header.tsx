import { FC, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Logo from './Logo'
import Menu from './Menu/Menu'
import { UserContext } from '../contexts/UserContext'
import { UserContextType } from '../types/contexts'
import Button from './Button'

const Header: FC = () => {
  const { scheduleId } = useParams()
  const { currentUser } = useContext(UserContext) as UserContextType

  return (
    <header className='border-b bg-white text-black shadow-md transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:text-white'>
      <div className='flex items-center justify-center gap-4 p-4'>
        <Link to='/'>
          <Logo size={24} />
        </Link>
        <div className='flex flex-auto items-center justify-end gap-2'>
          {scheduleId && scheduleId !== currentUser?.uid && (
            <Button
              variant='routeLink'
              to={`/schedule/${currentUser?.uid}`}
              className='text-white'
            >
              Создать свое расписание
            </Button>
          )}
          <Menu />
        </div>
      </div>
    </header>
  )
}

export default Header
