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
      value: '1',
    },
    {
      label: 'Yua Mikami',
      value: '2',
    },
  ]

  return (
    <div className='application-details-form card card-body p-10'>
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
          {/* Start form control */}
          <div className='form-wrap p-6'>
            {/* Name applicant */}
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8 full'>
              <div className='input-title-application left fs-3 text-start text-lg-end'>
                Name Of Applicant
              </div>
              <Input
                required={false}
                title={''}
                name='application_name'
                id={'application_name'}
                value={formValue.application_name}
                onChange={handleChange}
                className='input-custom-width-application w-100'
                classShared='flex-grow-1 w-sm-300px'
              />
            </div>

            {/* Application Number */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application left fs-3 text-start text-lg-end'>
                  Application Number
                </div>
                <Input
                  required={false}
                  name='application_number'
                  title={''}
                  id={'application_number'}
                  value={formValue.application_number}
                  onChange={handleChange}
                  classShared=' input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Application Date */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application left fs-3 text-start text-lg-end'>
                  Application Date
                </div>
                <InputTime
                  required={false}
                  title={''}
                  id={'application_date'}
                  name='application_date'
                  value={formValue.application_date}
                  onChange={handleChange}
                  classShared=' select-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* NRIC No. */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application left fs-3 text-start text-lg-end'>
                  NRIC No.
                </div>
                <Input
                  required={false}
                  name='application_number'
                  title={''}
                  id={'application_number'}
                  value={formValue.application_number}
                  onChange={handleChange}
                  classShared=' input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Agent */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Agent
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Loan Type */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Loan Type
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Marketing Type */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Marketing Type
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Customer Type */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Customer Type
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/*Identity Card Type  */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Identity Card Type
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Gender
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Date Of Birth */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application left fs-3 text-start text-lg-end'>
                  Date Of Birth
                </div>
                <InputTime
                  required={false}
                  title={''}
                  id={'application_date'}
                  name='application_date'
                  value={formValue.application_date}
                  onChange={handleChange}
                  type={'date'}
                  classShared=' select-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Singapore PR */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application left fs-3 text-start text-lg-end'>
                  Singapore PR
                </div>
                <Input
                  required={false}
                  name='application_number'
                  title={''}
                  id={'application_number'}
                  value={formValue.application_number}
                  onChange={handleChange}
                  classShared=' input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Race */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application left fs-3 text-start text-lg-end'>Race</div>
                <Input
                  required={false}
                  name='application_number'
                  title={''}
                  id={'application_number'}
                  value={formValue.application_number}
                  onChange={handleChange}
                  classShared=' input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Nationality */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Nationality
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Country
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* Residential Type */}
            <div>
              <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
                <div className='input-title-application fs-3 flex-grow-1 text-start text-lg-end'>
                  Residential Type
                </div>
                <Select
                  label=''
                  name='argent'
                  onChange={handleChange}
                  options={optionsAgent}
                  title=''
                  value={formValue.argent}
                  classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                />
              </div>
            </div>

            {/* End form control */}
          </div>
        </div>
        <div className='d-flex flex-end'>
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
