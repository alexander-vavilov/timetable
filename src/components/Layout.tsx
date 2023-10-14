import { FC } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { ScheduleContextProvider } from '../contexts/ScheduleContext'
import PrivateRoute from './PrivateRoute'

const Layout: FC = () => {
  return (
    <ScheduleContextProvider>
      <PrivateRoute>
        <div className='flex h-full flex-col overflow-hidden'>
          <Header />
          <Outlet />
        </div>
      </PrivateRoute>
    </ScheduleContextProvider>
  )
}

export default Layout
