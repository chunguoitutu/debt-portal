import './style.scss'

import {useAuth} from '../../../../context/AuthContext'

const AvatarHeader = ({firstname, lastname}) => {
  const {currentUser} = useAuth()
  let avatarInitials = ''

  if (currentUser?.firstname && currentUser?.lastname) {
    avatarInitials = `${currentUser?.firstname[0].toUpperCase()}${currentUser?.lastname[0].toUpperCase()}`
  }

  return (
    <div className='avatar-header-overview'>
      {avatarInitials ? (
        <div className='avatar-text image-name-user'>{avatarInitials}</div>
      ) : (
        <div className='default-avatar'>Default</div>
      )}
    </div>
  )
}

export default AvatarHeader
