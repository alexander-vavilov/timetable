import { FC, ReactNode, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../types/contexts'
import { Navigate } from 'react-router-dom'

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const { currentUser } = useContext(UserContext) as IUserContext

	if (!currentUser) return <Navigate to='/register' />
	return children
}

export default PrivateRoute
