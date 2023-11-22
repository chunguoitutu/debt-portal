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

  const refreshToken = async (token: string) => {
    Cookies.set('token', token)
    const companyIdFromCookie = Cookies.get('company_id') || 0
    const companyNameFromCookie = Cookies.get('company_name') || ''

    try {
      const {data: dataRes} = await getCurrentUser()
      const {data, error} = dataRes || {}
      const {company_id, priority, company_name} = data || {}

      if (error || !data) {
        logout()
        swalToast.fire({
          title: DEFAULT_MSG_ERROR,
          icon: 'error',
        })
        return
      }

      setCompanyId(+companyIdFromCookie || company_id || 0)
      setPriority(priority || 100)
      setCompanyName(companyNameFromCookie || company_name || '')
      setCurrentUser(data)
    } catch (error: any) {
      logout()
      swalToast.fire({
        title: DEFAULT_MSG_ERROR,
        icon: 'error',
      })
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
