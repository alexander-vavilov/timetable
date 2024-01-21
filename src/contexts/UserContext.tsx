import { onAuthStateChanged } from 'firebase/auth'
import { createContext, FC, ReactNode, useEffect, useState } from 'react'

import { auth } from '../../firebase'
import Spinner from '../components/Spinner'
import { ICurrentUser, IUserContext } from '../types/contexts'

export const UserContext = createContext<IUserContext | null>(null)

export const UserContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading)
    return (
      <div className="flex h-d-screen w-full items-center justify-center bg-gray-200 dark:bg-neutral-950">
        <Spinner />
      </div>
    )

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
