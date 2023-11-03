import {FC, useMemo, useState} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import BackgroundCheck from './background-check/BackgroundCheck'
import Step from '../../components/step/Step'
import {STEP_APPLICATION} from '../../constants/step'
import './style.scss'
import HeaderApplication from '../../components/applications/HeaderApplication'
import {
  ApplicationFormData,
  ApplicationPayload,
  PropsStepApplication,
  StepItem,
  useAuth,
} from '../../modules/auth'
import Remark, {messages, send} from './remark/Remark'
import Cookies from 'js-cookie'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Applications',
    path: '/applications',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

export const Applications = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [send, setSend] = useState<send[]>(messages)
  const [stepCompleted, setStepCompleted] = useState<number>(0)
  const [changeStep, setChangeStep] = useState<number | undefined>()
  const [formData, setFormData] = useState<ApplicationFormData>(
    STEP_APPLICATION.flatMap((item) => item.config).reduce(
      (result, current) => ({
        ...result,
        [current?.key as string]: current?.defaultValue || '',
      }),
      {
        address_contact_info: [
          {
            address_type_id: '',
            address_label: '',
            street_1: '',
            street_2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
          },
        ],
      }
    ) as ApplicationFormData
  )

  const percentCompleted = useMemo(
    () => (100 / (STEP_APPLICATION.length - 1)) * stepCompleted,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stepCompleted]
  )

  const {priority, currentUser} = useAuth()

  const CurrentComponentControl: FC<PropsStepApplication> | undefined = useMemo(() => {
    return STEP_APPLICATION[currentStep - 1].component
  }, [currentStep])

  function handleValidateBeforeChangeStep(step: number) {
    setChangeStep(step)
  }

  function handleContinue(stepWantGoTo: number | undefined) {
    // if argument undefined will go to next step
    if (!stepWantGoTo) {
      if (currentStep === STEP_APPLICATION.length) {
        return handleSubmitForm()
      }

      setStepCompleted(currentStep)
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(stepWantGoTo)

      // reset change step
      setChangeStep(undefined)
    }
  }

  function handleSubmitForm() {
    const {
      identification_type,
      identification_no,
      date_of_birth,
      firstname,
      lastname,
      middlename,
      gender,
      email_1,
      email_2,
      employment_status,
      mobilephone_1,
      mobilephone_2,
      homephone,
      monthly_income,
      spoken_language,
      loan_amount_requested,
      loan_type_id,
      account_number_1,
      account_number_2,
      bank_code_1,
      bank_code_2,
      bank_name_1,
      bank_name_2,
      monthly_income_1,
      monthly_income_2,
      monthly_income_3,
      annual_income,
      portal_code,
      company_name,
      address_contact_info,
    } = formData

    const company_id =
      priority === 1 ? Cookies.get('company_cookie') || 0 : currentUser?.company_id || 0

    if (!+company_id)
      return process.env.NODE_ENV === 'development' && console.warn('Missing company_id')

    const payload: ApplicationPayload = {
      customer: {
        company_id: +company_id,
        country_id: 1,
        identification_type,
        identification_no,
        customer_no: uuidv4(),
        date_of_birth,
        firstname,
        lastname,
        middlename,
        gender,
      },
      borrower: {
        email_1,
        email_2,
        employment_status,
        mobilephone_1,
        mobilephone_2,
        mobilephone_3: '',
        homephone,
        monthly_income,
        job_type_id: 1,
        spoken_language,
      },
      bank_account: {
        account_number_1,
        account_number_2,
        bank_code_1,
        bank_code_2,
        bank_name_1,
        bank_name_2,
      },
      employment: {
        portal_code,
        annual_income,
        address: '',
        company_telephone: '',
        company_name,
        monthly_income_1: +monthly_income_1,
        monthly_income_2: +monthly_income_2,
        monthly_income_3: +monthly_income_3,
      },
      application: {
        loan_terms: 12,
        loan_amount_requested: +loan_amount_requested,
        loan_type_id,
        status: 1,
        application_date: moment().format('L'),
        application_notes: JSON.stringify([]),
      },
      address: address_contact_info.map((item) => ({
        ...item,
        address_type_id: +item.address_type_id,
      })),
    }
    console.log(payload, 'hi')
  }

  const _STEP_APPLICATION: StepItem[] = useMemo(() => {
    const lengthStep = STEP_APPLICATION.length
    return STEP_APPLICATION.map((item, i) => {
      // Last step no edit anything
      if (i + 1 === lengthStep) {
        return item
      }

      const allFieldShow = item.config || []
      const totalField = allFieldShow.length
      const fieldDone = allFieldShow.reduce((acc, item) => {
        let isDone: boolean = true

        const valueCheck = formData[item.key]

        // Check array
        if (Array.isArray(valueCheck) && !(valueCheck.length > 0)) isDone = false

        // Check string
        if (typeof valueCheck === 'string' && !valueCheck) isDone = false

        // convert boolean to return 1 or 0
        return acc + +isDone
      }, 0)

      return {
        ...item,
        desc: (
          <span>
            Has been filled out{' '}
            <span className='text-gray-900 fw-bold'>
              {fieldDone}/{totalField}
            </span>{' '}
            information fields.
          </span>
        ),
      }
    })
  }, [formData])

  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'New Application'}</PageTitle>
      <div className='row gx-3 gx-xl-6 gy-8'>
        <div className='col-3 col-xxl-2 order-1'>
          <Step
            data={_STEP_APPLICATION}
            stepCompleted={stepCompleted}
            currentStep={currentStep}
            onGoToStep={handleValidateBeforeChangeStep}
          />
        </div>
        <div className='application-details-form card card-body col-9 col-xxl-8 order-2 p-0 d-flex flex-column h-fit-content'>
          <HeaderApplication
            labelStep={`${currentStep}. ${STEP_APPLICATION[currentStep - 1].label}`}
            percentCompleted={percentCompleted}
            className='p-10'
          />

          <div className='form-wrap p-10' style={currentStep === 2 ? {width: '91.5%'} : {}}>
            {CurrentComponentControl && (
              <CurrentComponentControl
                config={STEP_APPLICATION[currentStep - 1].config || []}
                formData={formData}
                setFormData={setFormData}
                onGoToStep={handleContinue}
                changeStep={changeStep}
                setChangeStep={setChangeStep}
              />
            )}
          </div>
        </div>
        <div className='d-none d-xxl-block col-xxl-2 order-0 order-xxl-3'>
          <div style={{paddingBottom: '30px'}}>
            <BackgroundCheck />
          </div>
          <div>
            {/* <PrintOptions /> */}
            <Remark setSend={setSend} send={send} />
          </div>
        </div>
      </div>
    </>
  )
}
