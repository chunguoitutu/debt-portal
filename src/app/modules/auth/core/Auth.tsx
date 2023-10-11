import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {UserInfo} from './_models'
import {WithChildren} from '../../../../_metronic/helpers'
import Cookies from 'js-cookie'

type AuthContextProps = {
  currentUser: UserInfo | undefined
  setCurrentUser: Dispatch<SetStateAction<UserInfo | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | undefined>()

  const logout = () => {
    setCurrentUser(undefined)
    Cookies.remove('token')
  }

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth}
