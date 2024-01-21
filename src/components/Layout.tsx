import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { ScheduleContextProvider } from '../contexts/ScheduleContext'
import Header from './Header'
import PrivateRoute from './PrivateRoute'

const Layout: FC = () => {
  return (
    <ScheduleContextProvider>
      <PrivateRoute>
        <div className="flex h-full flex-col overflow-hidden">
          <Header />
          <Outlet />
        </div>
      </PrivateRoute>
    </ScheduleContextProvider>
  )
}

export default Layout
