import { FC, useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Schedule, Login, Register, Lesson, Notfound } from './pages'
import { UserContext } from './contexts/UserContext'
import { ThemeContextType, UserContextType } from './types/contexts'
import Layout from './components/Layout'
import { Toaster } from 'sonner'
import { ThemeContext } from './contexts/ThemeContext'

const App: FC = () => {
  const { currentUser } = useContext(UserContext) as UserContextType
  const { theme } = useContext(ThemeContext) as ThemeContextType

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Navigate to={`schedule/${currentUser?.uid}`} />}
        />
        <Route element={<Layout />}>
          <Route
            path='schedule/:scheduleId/'
            element={
              <>
                <Schedule />
                <Outlet />
              </>
            }
          >
            <Route path='lesson/:lessonId' element={<Lesson />} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Toaster theme={theme} richColors />
    </>
  )
}

export default App
