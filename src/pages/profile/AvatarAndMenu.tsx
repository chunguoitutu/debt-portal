import {ChangeEvent, Dispatch, FC, SetStateAction, useState} from 'react'
import {PROFILE_MENU} from './config'
import clsx from 'clsx'
import Avatar from '@/components/avatar'
import {AvatarProps} from '@/app/types'
import {convertErrorMessageResponse, convertFileToBase64} from '@/app/utils'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import Button from '@/components/button/Button'
import {DEFAULT_MSG_ERROR} from '@/app/constants'

type ProfileProps = {
  activeId: number
  setActiveId: Dispatch<SetStateAction<number>>
}

const AvatarAndMenu: FC<ProfileProps> = ({activeId, setActiveId}) => {
  const [avatar, setAvatar] = useState<AvatarProps | null>(null)
  const [avatarDB, setAvatarDB] = useState<string>(
    'https://antimatter.vn/wp-content/uploads/2022/04/top-hinh-girl-xinh-trung-quoc-1-1-423x600.jpg'
  )
  const [loading, setLoading] = useState<boolean>(false)

  function handleChangeActiveId(id: number) {
    setActiveId(id)
  }

  function handleRemoveAvatar() {
    if (avatar) {
      setAvatar(null)
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

    setAvatar({
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
      setAvatar(null)
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
    <section className='card p-20px pt-60px pb-0 pb-md-60px d-flex flex-column justify-content-center align-items-center gap-20px h-100'>
      {/* Avatar */}
      <Avatar
        className='rounded-circle'
        size={'140px'}
        file={avatar?.base64 || avatarDB}
        onChange={handleChangeAvatar}
        onRemove={handleRemoveAvatar}
        accept='.png, .jpg, .jpeg, .webp'
      />

      {/* Name and email */}
      <div className='d-flex flex-column gap-8px text-center w-100'>
        <h2 className='fw-bold fs-20 m-0 text-truncate'>Tan Xiao Hui</h2>
        <span className='d-block text-gray-400 fs-14 fw-normal text-truncate'>
          tan-xiao-hui@gmail.com
        </span>

        {avatar && (
          <div className='d-flex align-items-center justify-content-center mt-8px gap-8px'>
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
      </div>

      {/* Menu */}
      <nav className='align-self-start w-100 profile__menu'>
        <ul className='m-0 p-0 list-style-none d-flex flex-md-column'>
          {PROFILE_MENU.map((el) => (
            <li
              key={el.id}
              onClick={() => handleChangeActiveId(el.id)}
              className={clsx([
                'flex-grow-1 fw-semibold text-gray-600 cursor-pointer text-center text-md-start',
              ])}
            >
              <span
                className={clsx([
                  'profile__menu--item ps-md-32px d-inline-block py-16px h-100',
                  activeId === el.id && 'active',
                ])}
              >
                {el.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default AvatarAndMenu
