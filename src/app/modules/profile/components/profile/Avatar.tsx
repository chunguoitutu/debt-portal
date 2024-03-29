import {useAuth} from '../../../../context/AuthContext'

const Avatar = ({firstname, lastname, style}) => {
  const {currentUser} = useAuth()
  let avatarInitials = ''

  if (currentUser?.firstname && currentUser?.lastname) {
    avatarInitials = `${currentUser?.lastname[0].toUpperCase()}${currentUser?.firstname[0].toUpperCase()}`
  }

  return (
    <div
      className='avatar'
      style={{
        backgroundColor: '#C0C0C0',
        width: '90px',
        height: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
        borderRadius: '0.475rem',
      }}
    >
      {avatarInitials ? (
        <div className='avatar-text fw-bold text-black'>{avatarInitials}</div>
      ) : (
        <div className='default-avatar'>Default</div>
      )}
    </div>
  )
}

export default Avatar
