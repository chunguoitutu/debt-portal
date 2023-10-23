import {useState} from 'react'

import {Input} from '../../../components/inputs/input'
import {InputTime} from '../../../components/inputs/inputTime'
import Select from '../../../components/select/select'
import './style.scss'


const ApplicationsDetails = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  const [formValue, setFormValue] = useState<any>({
    application_number: '',
    application_name: '',
    application_date: '',
    nric_no: '',
    argent: '',
    loan_type: '',
    marketing_type: '',
    customer_type: '',
    identitycard_card: '',
    gender: '',
    date_of_birth: '',
    singapore_pr: '',
    race: '',
    nationality: '',
    country: '',
    residential_type: '',
  })
  

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setFormValue({...formValue, [name]: value})
  }

  const optionsAgent = [
    {
     label: 'Anna Gau',
     value: '1'
    },
    {
      label: 'Yua Mikami',
      value: '2'
     },
  ]


  return (
    <div className='application-details-form card card-body h-100'>
      {/* header */}
      <div>
        <div className='d-flex align-items-center justify-content-between height-custom-90'>
          <div className='border-application fs-2'>1. Application Details</div>

          <div>
            <div className='d-flex flex-row align-items-center justify-content-between'>
              <div className='fs-5 fw-semibold'>Loan Application Completion</div>
              <div className='fs-6 fw-semibold'>40%</div>
            </div>
            <div className='d-flex flex-row'>
              <div className='line-success-details'></div>
              <div className='line-process-details'></div>
            </div>
          </div>
        </div>
        <div className='separator border-gray-200 py-0'></div>
        {/* body */}
        <div style={{paddingTop: 30}}>
          <div className='bg-check-text'>Background Check</div>

          <div className='p-3 d-flex align-items-center justify-content-between gap-8'>
            <div className='input-title-application fs-3 flex-grow-1 text-end'>Name Of Applicant</div>
            <Input
              required={false}
              title={''}
              name='application_name'
              id={'application_name'}
              value={formValue.application_name}
              onChange={handleChange}
              className='input-custom-width-application '
              style={{width: '818px'}}
              classShared=''
            />
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end'>
                  Appliaction Number
                </div>
                <Input
                  required={false}
                  name='application_number'
                  title={''}
                  id={'application_number'}
                  value={formValue.application_number}
                  onChange={handleChange}
                  className='input-application-size'
                  classShared=''
                />
              </div>
            </div>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>
                  Application Date
                </div>
                <InputTime
                  required={false}
                  title={''}
                  id={'application_date'}
                  name='application_date'
                  value={formValue.application_date}
                  onChange={handleChange}
                  style={{width: 245}}
                  classShared=''
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>NRIC No.</div>
                <Input
                  required={false}
                  title={''}
                  id={'nric_no'}
                  name='nric_no'
                  value={formValue.nric_no}
                  onChange={handleChange}
                  className='input-application-size'
                  classShared=''
                />
              </div>
            </div>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Argent</div>
                <Select
                name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Loan Type</div>
                <Select
                name='loan_type'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Marketing Type</div>
                <Select
                name='marking_type'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Customer Type</div>
                <Select
                name='customer_type'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>
                  Identity Card Type
                </div>
                <Select
                name='identitycard_card'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Gender</div>
                <Select
                  name='gender'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Date Of Birth</div>
                <InputTime
                  required={false}
                  title={''}
                  id={'name'}
                  value={''}
                  onChange={handleChange}
                  className='select-aoptionsAgentlication-size'
                  style={{width: 245}}
                  classShared=''
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Singapore PR</div>
                <Input
                  required={false}
                  title={''}
                  id={'singapore_pr'}
                  value={formValue.singapore_pr}
                  onChange={handleChange}
                  className='input-application-size'
                  classShared=''
                  name='singapore_pr'
                />
              </div>
            </div>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Race</div>
                <Input
                  required={false}
                  title={''}
                  id={'race'}
                  name='race'
                  value={formValue.race}
                  onChange={handleChange}
                  className='input-application-size'
                  classShared=''
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Nationality</div>
                <Select
                name='nationality'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>Country</div>
                <Select
                name='country'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
          </div>

          <div className='d-flex flex-row'>
            <div className='border-4 col-6'>
              <div className='w-100 p-3 d-flex align-items-center justify-content-between gap-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-end '>
                  Residential Type
                </div>
                <Select
                  name='residential_type'
                  onChange={handleChange}
                  options={optionsAgent}
                  fieldValueOption='value'
                  title=''
                  value={''}
                  className='select-application-size'
                  classShared=''
                />
              </div>
            </div>
          </div>
        </div>

        <div className=' d-flex justify-content-end px-6 py-6'>
          <button
            type='button'
            className='btn btn-secondary align-self-center me-3'
            onClick={() => {}}
            disabled={loading}
          >
            Save Draft
          </button>
          <button type='submit' className='btn btn-primary' disabled={loading} onClick={() => {}}>
            {!loading && 'Continue'}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicationsDetails
