import {Dispatch, FC, SetStateAction} from 'react'
import {PROFILE_MENU} from './config'
import clsx from 'clsx'

type ProfileProps = {
  activeId: number
  setActiveId: Dispatch<SetStateAction<number>>
}

const AvatarAndMenu: FC<ProfileProps> = ({activeId, setActiveId}) => {
  function handleChangeActiveId(id: number) {
    setActiveId(id)
  }

  return (
    <section className='card p-20px py-60px d-flex flex-column justify-content-center align-items-center gap-20px h-100'>
      {/* Avatar */}
      <div className='avatar w-140px mw-100'>
        <img
          src='https://vtv1.mediacdn.vn/zoom/640_400/2020/12/1/balotelli-16067759805341096037417.jpg'
          alt='avatar'
          className='w-100 h-100 object-fit-cover rounded-circle'
        />
      </div>

      {/* Name and email */}
      <div className='d-flex flex-column gap-8px text-center w-100'>
        <h2 className='fw-bold fs-20 m-0 text-truncate'>Tan Xiao Hui</h2>
        <span className='d-block text-gray-400 fs-14 fw-normal text-truncate'>
          tan-xiao-hui@gmail.com
        </span>
      </div>

      {/* Menu */}
      <nav className='align-self-start w-100 profile__menu'>
        <ul className='m-0 p-0 list-style-none d-flex flex-column'>
          {PROFILE_MENU.map((el) => (
            <li
              key={el.id}
              onClick={() => handleChangeActiveId(el.id)}
              className={clsx([
                'profile__menu--item fs-16 fw-semibold ps-24px ps-lg-32px py-16px text-gray-600 text-hover-gray-900 cursor-pointer',
                activeId === el.id && 'active',
              ])}
            >
              {el.label}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default AvatarAndMenu
