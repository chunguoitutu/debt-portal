import logo from '@/app/images/logo-mc.png'

type Props = {
  handleNavigate: () => void
}

const LogoHeader = ({handleNavigate}: Props) => {
  return (
    <div className='d-flex align-items-center cursor-pointer' onClick={handleNavigate}>
      <img src={logo} alt='logo' className='w-27px object-fit-cover ' />
      <div className='w-10px border border-left-0 h-37px border-top-0 M-1 border-right-1 border-bottom-0 border-gray-400 d-none d-sm-block'></div>
      <div className='ps-10px   d-none d-sm-block'>
        <h3 className='fs-16 fw-semibold m-0 text-white text-nowrap'>Finance 360</h3>
        <h3 className='fs-14 fw-normal m-0 text-white text-nowrap'>MCK Group</h3>
      </div>
    </div>
  )
}

export default LogoHeader
