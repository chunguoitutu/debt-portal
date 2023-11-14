import {useEffect} from 'react'
import {Navigate, Routes} from 'react-router-dom'
import {useAuth} from '../../../app/context/AuthContext'

export function Logout() {
  const {logout} = useAuth()
  useEffect(() => {
    logout()
    document.location.reload()
  }, [logout])

  return (
    <Routes>
      <Navigate to='/auth/login' />
    </Routes>
  )
}
