import {Navigate, Outlet} from 'react-router-dom'
import logo from './../../app/images/logoMC.png'
import Cookies from 'js-cookie'
import './style.scss'
import clsx from 'clsx'
import Header from '../header'
import {useState} from 'react'

const AuthLayout = () => {
  const [scroll, setSCroll] = useState(false)
  const token = Cookies.get('token')

  if (token) return <Navigate to='/dashboard' />

  return (
    <>
      <main className={clsx([`d-flex flex-column min-vh-100 ${scroll && 'overflow-hidden'}`])}>
        <div className='d-flex flex-column flex-grow-1'>
          <Header setSCroll={setSCroll} scroll={scroll} />
          <div className='mt-85px h-100'>{true && <Outlet />}</div>
        </div>
        {/* <Footer /> */}
      </main>
    </>
  )
}

export {AuthLayout}
