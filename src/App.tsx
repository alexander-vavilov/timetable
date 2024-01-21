import { FC, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import Layout from './components/Layout'
import { ThemeContext } from './contexts/ThemeContext'
import { UserContext } from './contexts/UserContext'
import { Login, Notfound, Register, Schedule } from './pages'
import { IThemeContext, IUserContext } from './types/contexts'

const App: FC = () => {
  const { currentUser } = useContext(UserContext) as IUserContext
  const { theme } = useContext(ThemeContext) as IThemeContext

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`schedule/${currentUser?.uid}`} />}
        />
        <Route element={<Layout />}>
          <Route path="schedule/:scheduleId/*" element={<Schedule />} />
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster theme={theme} richColors />
    </>
  )
}

export default App
