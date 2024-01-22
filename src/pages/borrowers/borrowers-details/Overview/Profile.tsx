import {CONFIG_PROFILE, DataOverview} from './config'

const Profile = ({data}: DataOverview) => {
  return (
    <div className='d-flex flex-column gap-16px'>
      {CONFIG_PROFILE.map((profile, i) => {
        return (
          <div key={i} className='d-flex  gap-16px'>
            <h1 className='col-3 fs-14 fw-normal text-gray-700 p-0 m-0'>{profile.value} </h1>
            <p className='col-9 fs-14 fw-semibold text-gray-900 p-0 m-0'>
              {data?.profile?.[profile.key] || false ? (
                data?.profile?.[profile.key]
              ) : (
                <span className=' text-capitalize none-company-detail m-0 p-0 h-100 fs-16 fw-semibold text-gray-800 font-italic'>
                  None
                </span>
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Profile
