import {useAuth} from '../../../../context/AuthContext'

const Avatar = ({firstname, lastname, style}) => {
  const {currentUser} = useAuth()
  let avatarInitials = ''

  if (currentUser?.firstname && currentUser?.lastname) {
    avatarInitials = `${currentUser?.firstname[0].toUpperCase()}${currentUser?.lastname[0].toUpperCase()}`
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
        borderRadius: '20%',
      }}
    >
      {avatarInitials ? (
        <div className='avatar-text' style={{color: '#000', fontWeight: 'bold'}}>
          {avatarInitials}
        </div>
      ) : (
        <div className='default-avatar'>Default</div>
      )}
    </div>
  )
}

export default Avatar
