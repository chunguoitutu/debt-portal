import Button from '@/components/button/Button'
import './style.scss'
import bgDebt from '@/app/images/bg-debt.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '@/app/context/AuthContext'
import {useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import Avatar from '@/components/avatar'
import {formatMoney} from '@/app/utils'
import DebtTile from '@/components/debt-title'

const Profile = () => {
  const {currentUser, setCurrentUser} = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    setCurrentUser(undefined)
    Cookies.remove('token')
    navigate('/login')
  }

  return (
    <>
      <DebtTile title='Profile' />

      <div
        className='profile d-flex flex-column py-32px px-24px flex-grow-1'
        style={{
          background: `url(${bgDebt}) no-repeat center / cover`,
        }}
      >
        <div className='profile-content d-flex flex-column align-items-center p-32px pb-20px rounded-24px mb-4px'>
          <Avatar
            size={'150px'}
            file='https://image.lag.vn/upload/news/23/04/05/tong-hop-ai-art-yae-miko-genshin-impact-1_DPSH.jpg'
            className='rounded-24px mb-24px'
            onChange={() => {}}
            onRemove={() => {}}
          />

          <h3 className='m-0 fs-20 text-white fw-bolder'>Savannah Nguyen</h3>
          <div className='profile-role py-4px px-16px rounded-24px mt-8px fw-bolder'>
            Debt Collector
          </div>
        </div>

        <div className='profile-collected rounded-24px d-flex flex-column align-items-center gap-4px px-32px py-20px mb-32px'>
          <span className='text-gray-400 fs-14'>You have earned:</span>
          <span className='fs-20 fw-bolder text-white'>{formatMoney(12540.32)}</span>
          <span className='text-gray-400 fs-14'>in commissions</span>
        </div>

        <Button
          className='d-flex justify-content-between btn-logout mt-auto text-white px-32px py-20px rounded-pill'
          onClick={handleLogout}
        >
          <span className='fs-14'>Log out</span>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </div>
    </>
  )
}

export default Profile
