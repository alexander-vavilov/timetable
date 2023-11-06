import { FC, useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Schedule, Login, Register, Notfound } from './pages'
import { UserContext } from './contexts/UserContext'
import { IThemeContext, IUserContext } from './types/contexts'
import Layout from './components/Layout'
import { Toaster } from 'sonner'
import { ThemeContext } from './contexts/ThemeContext'
import ShareModal from './components/Modals/ShareModal'
import LessonModal from './components/Modals/LessonModal'

const App: FC = () => {
	const { currentUser } = useContext(UserContext) as IUserContext
	const { theme } = useContext(ThemeContext) as IThemeContext

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
						<Route path='lesson/:lessonId' element={<LessonModal />} />
						<Route path='share' element={<ShareModal />} />
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
