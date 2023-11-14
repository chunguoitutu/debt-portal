import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {WithChildren} from '../../_metronic/helpers'
import Cookies from 'js-cookie'
import {swalToast} from '../swal-notification'
import {DEFAULT_MSG_ERROR} from '../constants/error-message'
import {UserInfo} from '../types/common'
import {getCurrentUser} from '../axios/request'

type AuthContextProps = {
  currentUser: UserInfo | undefined
  priority: number
  setCurrentUser: Dispatch<SetStateAction<UserInfo | undefined>>
  refreshToken: (token: string) => void
  logout: () => void
}

const initAuthContextPropsState = {
  currentUser: undefined,
  priority: 0,
  setCurrentUser: () => {},
  refreshToken: (token: string) => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | undefined>()
  const [priority, setPriority] = useState<number>(0)

  const logout = () => {
    setCurrentUser(undefined)
    Cookies.remove('token')
  }

  const refreshToken = async (token: string) => {
    Cookies.set('token', token)

    try {
      const {data} = await getCurrentUser()
      setPriority(data.data.priority)
      setCurrentUser(data.data)
    } catch (error: any) {
      logout()
      swalToast.fire({
        title: DEFAULT_MSG_ERROR,
        icon: 'error',
      })
    }
  }

  return (
    <AuthContext.Provider value={{currentUser, priority, setCurrentUser, refreshToken, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth}
