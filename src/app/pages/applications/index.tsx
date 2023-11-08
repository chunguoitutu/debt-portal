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
import Remark, {send} from './remark/Remark'
import Cookies from 'js-cookie'
import {INIT_BLOCK_ADDRESS} from '../../constants'
import * as Yup from 'yup'
import {BLOCK_ADDRESS_CONFIG} from './step-component/config'
import {useFormik} from 'formik'
import GeneralButton from './step-component/GeneralButton'
import request from '../../axios'
import {swalToast} from '../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../constants/error-message'
import {filterObjectKeyNotEmpty} from '../../utils'

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
  const [isDraft, setIsDraft] = useState<boolean>(false)
  const [send, setSend] = useState<send[]>([])
  const [stepCompleted, setStepCompleted] = useState<number>(0)

  const initialValues: ApplicationFormData = useMemo(() => {
    return STEP_APPLICATION.flatMap((item) => item.config).reduce(
      (result, current) => ({
        ...result,
        [current?.key as string]: current?.defaultValue || '',
      }),
      {address_contact_info: [INIT_BLOCK_ADDRESS]}
    ) as ApplicationFormData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STEP_APPLICATION])

  const schema = useMemo(() => {
    const currentStepObj = STEP_APPLICATION[currentStep - 1] || {}

    if (!currentStepObj.config) return

    const schemaObject = currentStepObj.config
      ?.filter((item) => item.validationFormik)
      .reduce(
        (result, current) => ({
          ...result,
          [current.key]: current.validationFormik,
        }),
        {}
      )

    if (currentStepObj.label === 'Contact Information') {
      const validationBlockAddress = BLOCK_ADDRESS_CONFIG.filter((item) => item.required).reduce(
        (result, current) => ({
          ...result,
          [current.key]: current.validationFormik,
        }),
        {}
      )
      const schemaBlockAddress = Yup.object().shape({
        address_contact_info: Yup.array().of(Yup.object().shape(validationBlockAddress)),
      })

      return Yup.object().shape(schemaObject).concat(schemaBlockAddress)
    }

    return Yup.object().shape(schemaObject)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  const percentCompleted = useMemo(
    () => (100 / (STEP_APPLICATION.length - 1)) * stepCompleted,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stepCompleted]
  )

  const CurrentComponentControl: FC<PropsStepApplication> | undefined = useMemo(() => {
    return STEP_APPLICATION[currentStep - 1].component
  }, [currentStep])

  const formik = useFormik<ApplicationFormData>({
    initialValues,
    validationSchema: schema,
    validateOnMount: false,
    onSubmit: () => {},
  })

  const {priority, currentUser} = useAuth()

  const _STEP_APPLICATION: StepItem[] = useMemo(() => {
    const lengthStep = STEP_APPLICATION.length
    return STEP_APPLICATION.map((item, i) => {
      // Last step no edit anything
      if (i + 1 === lengthStep) {
        return item
      }

      const blockAddress = formik?.values?.address_contact_info || []
      const allFieldShow = item.config || []
      let totalField = allFieldShow.length
      let number = 0

      if (
        item.label === 'Contact Information' &&
        Array.isArray(blockAddress) &&
        blockAddress.length
      ) {
        totalField += blockAddress?.length * Object.keys(blockAddress?.[0]).length

        number += blockAddress.reduce((acc, item) => {
          const objectHasValue = filterObjectKeyNotEmpty(item)

          return acc + Object.keys(objectHasValue).length
        }, 0)
      }

      const fieldDone = allFieldShow.reduce((acc: any, item: any) => {
        let isDone: boolean = true

        const valueCheck = formik.values[item.key]

        // Check array
        if (Array.isArray(valueCheck) && !(valueCheck.length > 0)) isDone = false

        // Check string
        if (typeof valueCheck === 'string' && !valueCheck) isDone = false

        // convert boolean to return 1 or 0
        return acc + +isDone
      }, number)

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])

  function handleGoToStep(stepWantGoTo: number) {
    // handle for block address
    formik.validateForm(formik.values).then((errors) => {
      if (Object.keys(errors).length > 0) {
        formik.setErrors(errors)

        const error = Object.keys(errors).reduce((acc, curr) => ({...acc, [curr]: true}), {})
        const errorBlockAddress = errors.address_contact_info
          ? {
              address_contact_info: ((errors?.address_contact_info as string[]) || [])?.map(
                (item) => Object.keys(item).reduce((acc, key) => ({...acc, [key]: true}), {})
              ),
            }
          : {}

        formik.setTouched({
          ...formik.touched,
          ...error,
          ...errorBlockAddress,
        })
      } else {
        setCurrentStep(stepWantGoTo)
      }
    })
  }

  function handleSaveDraft() {
    setIsDraft(true)

    formik.validateForm(formik.values).then((errors) => {
      if (Object.keys(errors).length > 0) {
        formik.setErrors(errors)

        const error = Object.keys(errors).reduce((acc, curr) => ({...acc, [curr]: true}), {})
        const errorBlockAddress = errors.address_contact_info
          ? {
              address_contact_info: ((errors?.address_contact_info as string[]) || [])?.map(
                (item) => Object.keys(item).reduce((acc, key) => ({...acc, [key]: true}), {})
              ),
            }
          : {}

        formik.setTouched({
          ...formik.touched,
          ...error,
          ...errorBlockAddress,
        })

        setIsDraft(false)
      } else {
        handleSubmitForm()
      }
    })
  }

  function handleBeforeSubmit() {
    formik.validateForm(formik.values).then((errors) => {
      if (Object.keys(errors).length > 0) {
        formik.setErrors(errors)

        const error = Object.keys(errors).reduce((acc, curr) => ({...acc, [curr]: true}), {})
        const errorBlockAddress = errors.address_contact_info
          ? {
              address_contact_info: ((errors?.address_contact_info as string[]) || [])?.map(
                (item) => Object.keys(item).reduce((acc, key) => ({...acc, [key]: true}), {})
              ),
            }
          : {}

        formik.setTouched({
          ...formik.touched,
          ...error,
          ...errorBlockAddress,
        })
      } else {
        handleContinue()
      }
    })
  }

  function handleContinue() {
    if (currentStep === STEP_APPLICATION.length) {
      handleSubmitForm()
    } else {
      currentStep > stepCompleted && setStepCompleted(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  async function handleSubmitForm() {
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
      mobilephone_3,
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
      address,
      loan_terms,
      marketing_type_id,
      company_telephone,
      occupation,
      position,
      specialization,
      six_months_income,
    } = formik.values

    const company_id =
      priority === 1 ? Cookies.get('company_cookie') || 0 : currentUser?.company_id || 0

    if (!+company_id)
      return process.env.NODE_ENV === 'development' && console.warn('Missing company_id')

    const addressList = address_contact_info
      .filter((item) => item.address_type_id)
      .map((item) => ({
        ...item,
        address_type_id: +item.address_type_id,
      }))

    const payload: ApplicationPayload = {
      customer: {
        company_id: +company_id,
        country_id: 1,
        identification_type,
        identification_no,
        customer_no: '',
        date_of_birth: date_of_birth ? new Date(date_of_birth) : '',
        firstname,
        lastname,
        middlename,
        gender,
      },
      borrower: {
        email_1,
        email_2,
        employment_status,
        mobilephone_1: String(mobilephone_1),
        mobilephone_2: String(mobilephone_2),
        mobilephone_3: String(mobilephone_3),
        homephone: String(homephone),
        monthly_income: +monthly_income || 0,
        job_type_id: 1,
        spoken_language,
        marketing_type_id: +marketing_type_id,
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
        annual_income: +annual_income,
        address,
        company_telephone: String(company_telephone),
        company_name,
        monthly_income_1: +monthly_income_1,
        monthly_income_2: +monthly_income_2,
        monthly_income_3: +monthly_income_3,
        occupation,
        position,
        specialization,
        six_months_income: +six_months_income,
      },
      application: {
        loan_terms: +loan_terms,
        loan_amount_requested: +loan_amount_requested,
        loan_type_id: +loan_type_id,
        status: 1,
        application_date: new Date(),
        application_notes: JSON.stringify(send),
        is_draft: isDraft ? 1 : 0,
      },
      address: addressList,
    }

    try {
      formik.setSubmitting(true)

      await request.post('/application/create', payload)

      swalToast.fire({
        title: isDraft
          ? 'Application draft successfully created'
          : 'Application successfully created',
        icon: 'success',
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      formik.setSubmitting(false)
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>{'New Application'}</PageTitle>
      <div className='row gx-3 gx-xl-6 gy-8'>
        <div className='col-3 col-xxl-2 order-1'>
          <Step
            data={_STEP_APPLICATION}
            stepCompleted={stepCompleted}
            currentStep={currentStep}
            onGoToStep={handleGoToStep}
          />
        </div>
        <div className='application-details-form card card-body col-9 col-xxl-8 order-2 p-0 d-flex flex-column h-fit-content'>
          <HeaderApplication
            labelStep={`${currentStep}. ${STEP_APPLICATION[currentStep - 1].label}`}
            percentCompleted={percentCompleted}
            className='p-10'
          />

          <div
            className={`${currentStep !== 6 ? 'form-wrap p-10' : ''}`}
            style={currentStep === 2 ? {width: '91.5%'} : {}}
          >
            {CurrentComponentControl && (
              <CurrentComponentControl
                config={STEP_APPLICATION[currentStep - 1].config || []}
                formik={formik}
              />
            )}

            <GeneralButton
              handleSaveDraft={handleSaveDraft}
              handleSubmit={handleBeforeSubmit}
              config={STEP_APPLICATION[currentStep - 1].config || []}
              formik={formik}
              isDraft={isDraft}
              currentStep={currentStep}
            />
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
