import { FC, useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import Layout from './components/Layout'
import ShareModal from './components/Modals/ShareModal'
import { ThemeContext } from './contexts/ThemeContext'
import { UserContext } from './contexts/UserContext'
import { Lesson, Login, Notfound, Register, Schedule } from './pages'
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
          <Route
            path="schedule/:scheduleId"
            element={
              <>
                <Schedule />
                <Outlet />
              </>
            }
          >
            <Route path="lesson/:lessonId" element={<Lesson />} />
            <Route path="share" element={<ShareModal />} />
          </Route>
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
