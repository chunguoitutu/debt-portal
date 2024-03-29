import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import Cookies from 'js-cookie'
import {JwtDecode, UserInfo, WithChildren} from '../types/common'
import {getCurrentUser} from '../axios/request'
import jwtDecode from 'jwt-decode'
import {deleteAllCookies} from '../utils'

type AuthContextProps = {
  currentUser: UserInfo | undefined
  priority: number
  company_id: number
  company_name: string
  setCompanyName: Dispatch<SetStateAction<string>>
  setCurrentUser: Dispatch<SetStateAction<UserInfo | undefined>>
  refreshToken: (token: string) => void
  logout: () => void
}

const initAuthContextPropsState = {
  currentUser: undefined,
  priority: 0,
  company_id: 0,
  company_name: '',
  setCurrentUser: () => {},
  setCompanyName: () => {},
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
  const [companyId, setCompanyId] = useState<number>(0)
  const [companyName, setCompanyName] = useState<string>('')

  const logout = () => {
    setCurrentUser(undefined)
    deleteAllCookies()
    setCompanyName('')
    setPriority(0)
    setCompanyId(0)
  }

  function handleLogout() {
    logout()
    return
  }

  const refreshToken = async (token: string) => {
    if (!token) return handleLogout()

    const {exp} = jwtDecode<JwtDecode>(token || '')
    const timestamp = exp ? (+exp || 0) * 1000 : 0

    const expires = exp ? new Date(timestamp) : undefined
    if (!timestamp || !expires || !token) {
      return handleLogout()
    }

    Cookies.set('token', token, {
      expires,
    })

    try {
      const {data: dataRes} = await getCurrentUser()

      const {data, error} = dataRes || {}
      const {company_id, priority, company_name} = data || {}

      if (error || !data) {
        return handleLogout()
      }

      // Super admin receive company id from cookie
      setCompanyName(company_name)
      setCompanyId(company_id)
      setPriority(priority || 100)
      setCurrentUser(data)
    } catch (error: any) {
      return handleLogout()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        priority,
        company_id: companyId,
        company_name: companyName,
        setCurrentUser,
        setCompanyName: setCompanyName,
        refreshToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth}
