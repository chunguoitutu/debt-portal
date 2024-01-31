import Button from '../button/Button'
import './style.scss'
import logo from '@/app/images/logo-mc.png'

const Header = () => {
  return (
    <header className='header position-sticky top-0 z-index-1 py-20px bg-black'>
      <div className='container d-flex align-items-center justify-content-between gap-12px gap-sm-24px'>
        <div className='d-flex align-items-center'>
          <img src={logo} alt='logo' className='w-30px object-fit-cover' />

          <div className='ps-10px ms-10px border border-left-1 border-top-0 border-right-0 border-bottom-0 border-gray-400 d-none d-sm-block'>
            <h3 className='fs-16 fw-semibold m-0 text-white text-nowrap'>Finance 360</h3>
            <h3 className='fs-14 fw-normal m-0 text-white text-nowrap'>MCK Group</h3>
          </div>
        </div>

        {/* Logged */}
        {/* <nav>
          <ul className='m-0 list-style-none'>
            <li className=''>Home</li>
          </ul>
        </nav> */}

        {/* Not logged */}
        <div className='d-flex align-items-center gap-8px gap-sm-16px'>
          <Button className='border border-primary text-white bg-hover-primary'>
            Login With Singpass
          </Button>
          <Button>Login</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
