type Props = {
  data: any
}

const Profiles = [
  {
    key: 'identification_no',
    value: 'NRIC No',
  },
  {
    key: 'gender',
    value: 'Gender',
  },
  {
    key: 'date_of_birth',
    value: 'Date of birth',
  },
  {
    key: 'country_id',
    value: 'Nationalities',
  },
  {
    key: 'company',
    value: 'Company',
  },
  {
    key: 'mobilephone_1',
    value: 'Phone',
  },
  {
    key: 'email1',
    value: 'Email',
  },
]

const Profile = ({data}: Props) => {
  return (
    <div className='d-flex flex-column gap-16px'>
      {Profiles.map((profile, i) => {
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
