import Button from '@/components/button/Button'
import './style.scss'
import bgDebt from '@/app/images/bg-debt.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '@/app/context/AuthContext'
import {ChangeEvent, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import Avatar from '@/components/avatar'
import {convertErrorMessageResponse, formatMoney, getFullName} from '@/app/utils'
import {convertFileToBase64} from '@/app/utils'

import DebtTile from '@/components/debt-title'
import {AvatarProps} from '@/app/types'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {DEFAULT_MSG_ERROR} from '@/app/constants'

const Profile = () => {
  const {currentUser, setCurrentUser} = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    setCurrentUser(undefined)
    Cookies.remove('token')
    navigate('/login')
  }

  const [avatarEdit, setAvatarEdit] = useState<AvatarProps | null>(null)
  const [avatarDB, setAvatarDB] = useState<string>(
    'https://6.soompi.io/wp-content/uploads/image/28a73c5946a847f6936e6b2f06fbf73c.jpeg?s=900x600&e=t'
  )
  const [loading, setLoading] = useState<boolean>(false)

  function handleRemoveAvatar() {
    if (avatarEdit) {
      setAvatarEdit(null)
      return
    }

    // Show warning
    swalConfirm
      .fire({
        title: 'Are You Sure?',
        text: `You Won't Be Able To Revert This.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleRemoveAvatarDb()
        }
      })
  }

  async function handleRemoveAvatarDb() {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500)
      })
      setAvatarDB(null)
      swalToast.fire({
        icon: 'success',
        title: 'Avatar successfully deleted',
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: DEFAULT_MSG_ERROR,
      })
    }
  }

  async function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    const img = e.target.files[0]

    if (!img) return

    const isValidImg = ['image/jpeg', 'image/png', 'image/webp'].includes(img?.type)

    if (!isValidImg) {
      return swalToast.fire({
        icon: 'error',
        title: 'Can not upload photos. Photos must be saved as JPG, PNG, or WebP files.',
      })
    }
    const fileBase64 = await convertFileToBase64(img)

    setAvatarEdit({
      type: img.type,
      base64: fileBase64,
    })

    // Reset file values
    e.target.value = ''
  }

  async function handleUploadAvatar() {
    setLoading(true)

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), 500)
      })
      setAvatarEdit(null)
      swalToast.fire({
        icon: 'success',
        title: 'Avatar successfully updated',
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DebtTile title='Profile' />

      <div
        className='profile d-flex flex-column py-32px px-24px flex-grow-1 overflow-auto'
        style={{
          background: `url(${bgDebt}) no-repeat center / cover`,
        }}
      >
        <div className='profile-content d-flex flex-column align-items-center p-32px pb-20px rounded-24px mb-4px'>
          <Avatar
            className='rounded-circle'
            size={'140px'}
            file={avatarEdit?.base64 || avatarDB}
            onChange={handleChangeAvatar}
            onRemove={handleRemoveAvatar}
            accept='.png, .jpg, .jpeg, .webp'
          />

          {avatarEdit && (
            <div className='d-flex align-items-center justify-content-center mt-24px gap-8px'>
              <Button className='btn-secondary' onClick={handleRemoveAvatar} disabled={loading}>
                Cancel
              </Button>
              <Button
                className='btn-primary'
                onClick={handleUploadAvatar}
                loading={loading}
                disabled={loading}
              >
                Upload
              </Button>
            </div>
          )}

          <h3 className='m-0 fs-20 text-white fw-bolder mt-30px'>{getFullName(currentUser)} </h3>
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
