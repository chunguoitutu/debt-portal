import {useState} from 'react'

import Select from '../../../components/select/select'
import './style.scss'
import {Input} from '../../../components/inputs/input'
import {InputTime} from '../../../components/inputs/inputTime'
import InputAdvance from '../../../components/inputs/InputAdvance'
import {SALUTATION_OPTION} from '../../../constants/option'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Radio from '../../../components/radio/Radio'
import {CUSTOMER_TYPE} from '../../../utils/globalConfig'
import clsx from 'clsx'
import Button from '../../../components/button/Button'

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
    customer_type: CUSTOMER_TYPE[0].value || '',
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
      label: 'Andre Onana',
      value: '1',
    },
    {
      label: 'Harry Maguire',
      value: '2',
    },
  ]

  return (
    <div className='application-details-form card card-body d-flex flex-column p-10 h-100'>
      {/* header */}
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
      <div className='pt-9 flex-grow-1'>
        {/* Start form control */}
        <div className='form-wrap p-6'>
          {/* Customer type */}
          <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8 full'>
            <div className='input-title-application left fs-4 text-start text-lg-end'>
              Customer type
            </div>

            <div className='d-flex align-items-center gap-5'>
              {CUSTOMER_TYPE.map((item) => (
                <Radio
                  classNameLabel={clsx([
                    formValue.customer_type === item.value ? 'text-gray-800' : 'text-gray-600',
                  ])}
                  name='customer_type'
                  label={item.label}
                  value={item.value}
                  checked={formValue.customer_type === item.value}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          {/* Name applicant */}
          <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8 full'>
            <div className='input-title-application left fs-4 text-start text-lg-end'>
              Name Of Applicant
            </div>

            <InputAdvance
              classShared='flex-grow-1 w-sm-300px'
              className='w-100'
              value={formValue.application_name}
              onChange={handleChange}
              name='application_name'
              insertLeft={
                <Tippy offset={[120, 0]} content='Choose the greeting you want to be called'>
                  {/* Wrapper with a span tag to show tooltip */}
                  <span>
                    <Select
                      onChange={handleChange}
                      value={formValue.salutation}
                      isOptionDefault={false}
                      classShared='m-0'
                      className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                      name='salutation'
                      options={SALUTATION_OPTION}
                    />
                  </span>
                </Tippy>
              }
            />
          </div>

          {/* Application Number */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application left fs-4 text-start text-lg-end'>
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
              <div className='input-title-application left fs-4 text-start text-lg-end'>
                Application Date
              </div>
              <InputTime
                required={false}
                title={''}
                type='date'
                id={'application_date'}
                name='application_date'
                value={formValue.application_date}
                onChange={handleChange}
                classShared=' select-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/*Identity Card Type  */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                ID Type
              </div>
              <Select
                label=''
                name='identitycard_card'
                onChange={handleChange}
                options={optionsAgent}
                title=''
                value={formValue.identitycard_card}
                id='identitycard_card'
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* NRIC No. */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application left fs-4 text-start text-lg-end'>
                NRIC No.
              </div>

              <InputAdvance
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
                className='w-100'
                value={formValue.nric_nonric_no}
                onChange={handleChange}
                name='nric_nonric_no'
                insertRight={
                  <Tippy offset={[40, 0]} content='Lookup Customer'>
                    {/* Wrapper with a span tag to show tooltip */}
                    <div className='supplement-input-advance search-icon d-flex align-items-center justify-content-center align-self-stretch border-0 border-left-1 rounded-left-0 bg-none px-4 cursor-pointer text-gray-600'>
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                  </Tippy>
                }
              />
            </div>
          </div>

          {/* Agent */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                Agent
              </div>
              <Select
                label=''
                id='argent'
                name='argent'
                onChange={handleChange}
                options={optionsAgent}
                value={formValue.argent}
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Loan Type */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                Loan Type
              </div>
              <Select
                label=''
                name='loan_type'
                onChange={handleChange}
                options={optionsAgent}
                id='loan_type'
                title=''
                value={formValue.loan_type}
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Marketing Type */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                Marketing Type
              </div>
              <Select
                label=''
                name='marketing_type'
                onChange={handleChange}
                options={optionsAgent}
                title=''
                id='marketing_type'
                value={formValue.marketing_type}
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                Gender
              </div>
              <Select
                label=''
                name='gender'
                onChange={handleChange}
                options={optionsAgent}
                title=''
                value={formValue.gender}
                id='gender'
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Date Of Birth */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application left fs-4 text-start text-lg-end'>
                Date of Birth
              </div>
              <InputTime
                required={false}
                title={''}
                id={'date_of_birth'}
                name='date_of_birth'
                value={formValue.date_of_birth}
                onChange={handleChange}
                type={'date'}
                classShared=' select-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Singapore PR */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application left fs-4 text-start text-lg-end'>
                Singapore PR
              </div>
              <Input
                required={false}
                name='singapore_pr'
                title={''}
                id={'singapore_pr'}
                value={formValue.singapore_pr}
                onChange={handleChange}
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Race */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application left fs-4 text-start text-lg-end'>Race</div>
              <Input
                required={false}
                name='race'
                title={''}
                id={'race'}
                value={formValue.race}
                onChange={handleChange}
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Nationality */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                Nationality
              </div>
              <Select
                label=''
                name='nationality'
                onChange={handleChange}
                options={optionsAgent}
                title=''
                value={formValue.nationality}
                id='nationality'
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                Country
              </div>
              <Select
                label=''
                name='country'
                id='country'
                onChange={handleChange}
                options={optionsAgent}
                title=''
                value={formValue.country}
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* Residential Type */}
          <div>
            <div className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8'>
              <div className='input-title-application fs-4 flex-grow-1 text-start text-lg-end'>
                Residential Type
              </div>
              <Select
                label=''
                name='residential_type'
                id='residential_type'
                onChange={handleChange}
                options={optionsAgent}
                title=''
                value={formValue.residential_type}
                classShared='input-wrap flex-shrink-0 w-sm-300px w-xl-200px'
              />
            </div>
          </div>

          {/* End form control */}
        </div>
      </div>

      <div className='d-flex flex-end mt-auto'>
        <Button
          onClick={() => {}}
          className='btn-secondary align-self-center me-3'
          disabled={loading}
        >
          Save Draft
        </Button>
        <Button type='submit' loading={loading} disabled={loading} onClick={() => {}}>
          Continue
        </Button>
      </div>
    </div>
  )
}

export default ApplicationsDetails
