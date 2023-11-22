import {FC, useState, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {WithChildren} from '../../_metronic/helpers'
import Cookies from 'js-cookie'
import {swalToast} from '../swal-notification'
import {JwtDecode, UserInfo} from '../types/common'
import {getCurrentUser} from '../axios/request'
import jwtDecode from 'jwt-decode'

type AuthContextProps = {
  currentUser: UserInfo | undefined
  priority: number
  company_id: number
  company_name: string
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
    Cookies.remove('token')
  }

  function handleLogout() {
    logout()
    swalToast.fire({
      title: 'Login session has expired',
      icon: 'error',
    })
    return
  }

  const refreshToken = async (token: string) => {
    if (!token) return handleLogout()

    const {exp} = jwtDecode<JwtDecode>(token || '')
    const timestamp = exp ? (+exp || 0) * 1000 : 0

    // Chuyển đổi timestamp thành đối tượng Date
    const expires = exp ? new Date(timestamp) : undefined

    if (!timestamp || !expires || !token) {
      return handleLogout()
    }

    Cookies.set('token', token, {
      expires,
    })

    const companyIdFromCookie = Cookies.get('company_id') || 0
    const companyNameFromCookie = Cookies.get('company_name') || ''

    try {
      const {data: dataRes} = await getCurrentUser()
      const {data, error} = dataRes || {}
      const {company_id, priority, company_name} = data || {}

      if (error || !data) {
        return handleLogout()
      }

      setCompanyId(+companyIdFromCookie || company_id || 0)
      setPriority(priority || 100)
      setCompanyName(companyNameFromCookie || company_name || '')
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
        refreshToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, useAuth}
