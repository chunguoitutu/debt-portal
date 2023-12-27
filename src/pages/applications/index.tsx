import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import moment from 'moment'
import './style.scss'
import BackgroundCheck from './background-check/BackgroundCheck'
import Step from '../../components/step/Step'
import HeaderApplication from '../../components/applications/HeaderApplication'
import Remark from './remark/Remark'
import * as Yup from 'yup'
import {BLOCK_ADDRESS_CONFIG} from './step-component/config'
import {useFormik} from 'formik'
import GeneralButton from './step-component/GeneralButton'
import NotFoundPage from '../not-found-page/NotFoundPage'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import request from '../../app/axios'
import {useAuth} from '../../app/context/AuthContext'
import {
  ApplicationFormData,
  ApplicationPayload,
  CreateSuccessResponse,
  PropsStepApplication,
  RemarkItem,
  StepItem,
} from '@/app/types'
import {STEP_APPLICATION, handleCreateBlockAddress} from '@/app/constants'
import {convertErrorMessageResponse, filterObjectKeyNotEmpty} from '@/app/utils'
import {swalToast} from '@/app/swal-notification'
import clsx from 'clsx'
import Reject from './step-component/reject/Reject'
import Icons from '@/components/icons'
import Cookies from 'js-cookie'
import {useSocket} from '@/app/context/SocketContext'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Application',
    path: '/application',
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

interface ListIdEdit {
  customerId: number
  borrowerId: number
  employmentId: number
  applicationId: number
  bankInfoId: number
  cpfId?: number
}

export const Applications = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isDraft, setIsDraft] = useState<boolean>(false)
  const [remarkList, setRemarkList] = useState<RemarkItem[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [loadApiEdit, SetLoadApiEdit] = useState<boolean>(false)
  const [showRemark, setShowRemark] = useState<boolean>(false)
  // const [checkAmount, SetCheckAmount] = useState<number>(0)
  // const [popupSingpass, setPopupSingpass] = useState(false)
  const [searchParams] = useSearchParams()
  const [optionsRejectionType, setOptionsRejectionType] = useState<any>([])
  const [optionsUser, setOptionsUser] = useState<any>([])
  const [singpass, setSingpass] = useState(false)
  const [rejectionOne, setRejectionOne] = useState<any>({})
  const [stepCompleted, setStepCompleted] = useState<number>(0)
  const [errorLoading, setErrorLoading] = useState(false)
  const [data, setData] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [listIdEdit, setListIdEdit] = useState<ListIdEdit>({
    customerId: 0,
    borrowerId: 0,
    employmentId: 0,
    applicationId: 0,
    bankInfoId: 0,
    cpfId: 0,
  })
  const {pathname} = useLocation()
  const initialValues: ApplicationFormData = useMemo(() => {
    return STEP_APPLICATION.flatMap((item) => item.config).reduce(
      (result, current) => ({
        ...result,
        [current?.key as string]: current?.defaultValue || '',
      }),
      {address_contact_info: [handleCreateBlockAddress(false)]}
    ) as ApplicationFormData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [STEP_APPLICATION])

  const {applicationIdEdit} = useParams()
  const {socket} = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    if (!applicationIdEdit) return setIsLoading(false)
    !!applicationIdEdit &&
      request
        .post('config/rejection_type/listing', {
          status: true,
          pageSize: 99999,
          currentPage: 1,
        })
        .then((res) => {
          setOptionsRejectionType(res?.data?.data || [])
        })
        .catch()
    !!applicationIdEdit &&
      request
        .post('config/user/listing', {
          status: true,
          pageSize: 99999,
          currentPage: 1,
        })
        .then((res) => {
          setOptionsUser(res?.data?.data || [])
        })
        .catch()
    handleGetApplicationById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationIdEdit, loadApiEdit, pathname])

  useEffect(() => {
    resetForm()
    setStepCompleted(0)
    if (pathname === '/application/create') {
      setCurrentStep(1)
    }
    setSingpass(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [currentStep])

  useEffect(() => {
    const authCode = searchParams.get('code')
    const codeVerifier = Cookies.get('codeVerifier')

    if (!authCode || !codeVerifier) return

    // handleGetPersonData({authCode, codeVerifier})
  }, [])

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
  const {
    values,
    touched,
    validateForm,
    setErrors,
    setValues,
    setTouched,
    setSubmitting,
    resetForm,
  } = formik

  const {company_id} = useAuth()

  const _STEP_APPLICATION: StepItem[] = useMemo(() => {
    const lengthStep = STEP_APPLICATION.length

    return STEP_APPLICATION.map((item, i) => {
      // Last step no edit anything
      if (i + 1 === lengthStep) {
        return item
      }

      const blockAddress = formik?.values?.address_contact_info || []
      const allFieldShow = item.config.filter((el) => !el.isHide) || []
      let totalField = allFieldShow.length
      let number = 0

      if (
        item.label === 'Contact Information' &&
        Array.isArray(blockAddress) &&
        blockAddress.length
      ) {
        totalField +=
          blockAddress?.length *
          Object.keys(blockAddress?.[0]).filter(
            (key) => !['property_type', 'borrower_id', 'id'].includes(key)
          ).length

        number += blockAddress.reduce((acc, item) => {
          const objectHasValue = filterObjectKeyNotEmpty(item)

          return (
            acc +
            Object.keys(objectHasValue).filter(
              (key) => !['property_type', 'borrower_id', 'id'].includes(key)
            ).length
          )
        }, 0)
      }

      const fieldDone = allFieldShow.reduce((acc: any, item: any) => {
        let isDone: boolean = true

        const valueCheck = values[item.key]

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
          <span className='text-B5B5C3'>
            Has been filled out{' '}
            <span
              className={clsx([
                '',
                currentStep === i + 1 ? 'fw-bold text-gray-900' : 'text-gray-400',
              ])}
            >
              {fieldDone}/{totalField}
            </span>{' '}
            information fields.
          </span>
        ),
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, currentStep])

  async function handleGetApplicationById() {
    try {
      const {data} = await request.get(`/application/detail/${applicationIdEdit}`)
      setRejectionOne(data?.rejection || {})
      setData(data?.data || {})
      const {
        borrower,
        application,
        customer,
        bank_account,
        employment,
        address,
        file_documents,
        approval,
        cpf,
      } = data.data || {}

      const formattedDateOfBirth = moment(customer?.date_of_birth).format('YYYY-MM-DD')

      if (cpf) {
        const date = JSON.parse(cpf.date)
        const employer = JSON.parse(cpf.employer)
        const amount = JSON.parse(cpf.amount)
        const month = JSON.parse(cpf.month)
      }

      setValues({
        ...values,
        ...borrower,
        ...application,
        ...customer,
        ...bank_account,
        ...employment,
        ...cpf,
        address_contact_info:
          Array.isArray(address) && address.length ? [...address] : values.address_contact_info,
        date_of_birth: formattedDateOfBirth,
        file_documents:
          file_documents.map((data) => {
            return {...data, base64: 'data:application/pdf;base64,' + data?.base64}
          }) || [],
        ...(approval ? {approval} : {}),
      })

      if (application?.status !== 0) {
        setStepCompleted(STEP_APPLICATION.length - 1)
      }

      setListIdEdit({
        customerId: customer?.id || 0,
        borrowerId: borrower?.id || 0,
        employmentId: employment?.id || 0,
        applicationId: application?.id || 0,
        bankInfoId: bank_account?.id || 0,
      })
      cpf && setSingpass(true)
      const applicationNotes = JSON.parse(application?.application_notes) || []
      setRemarkList(applicationNotes)
    } catch (error) {
      setErrorLoading(true)
    } finally {
      setIsLoading(false)
    }
  }

  function handleGoToStep(stepWantGoTo: number) {
    // handle for block address
    validateForm(values).then((errors) => {
      if (Object.keys(errors).length > 0) {
        setErrors(errors)

        const error = Object.keys(errors).reduce((acc, curr) => ({...acc, [curr]: true}), {})
        const errorBlockAddress = errors.address_contact_info
          ? {
              address_contact_info: ((errors?.address_contact_info as string[]) || [])?.map(
                (item) => Object.keys(item).reduce((acc, key) => ({...acc, [key]: true}), {})
              ),
            }
          : {}

        setTouched({
          ...touched,
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

    validateForm(values).then((errors) => {
      if (Object.keys(errors).length > 0) {
        setErrors(errors)

        const error = Object.keys(errors).reduce((acc, curr) => ({...acc, [curr]: true}), {})
        const errorBlockAddress = errors.address_contact_info
          ? {
              address_contact_info: ((errors?.address_contact_info as string[]) || [])?.map(
                (item) => Object.keys(item).reduce((acc, key) => ({...acc, [key]: true}), {})
              ),
            }
          : {}

        setTouched({
          ...touched,
          ...error,
          ...errorBlockAddress,
        })

        setIsDraft(false)
      } else {
        handleSubmitForm(true)
      }
    })
  }

  function handleBeforeSubmit() {
    validateForm(values).then((errors) => {
      if (Object.keys(errors).length > 0) {
        // set touched field error
        const error = Object.keys(errors).reduce((acc, curr) => ({...acc, [curr]: true}), {})

        // set touched on step contact info (block address)
        const errorBlockAddress = errors.address_contact_info
          ? {
              address_contact_info: (values?.address_contact_info || [])?.map((item) => {
                return Object.keys(item).reduce((acc, key) => ({...acc, [key]: true}), {})
              }),
            }
          : {}

        setErrors(errors)
        setTouched({
          ...touched,
          ...error,
          ...errorBlockAddress,
        })
      } else if (
        (values.loan_amount_requested > 3000 &&
          currentStep === 6 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 20000 &&
          values.identification_type === 'singapore_nric_no') ||
        (values.loan_amount_requested > +values.six_months_income &&
          currentStep === 6 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 20000 &&
          values.identification_type === 'singapore_nric_no') ||
        (values.loan_amount_requested > 500 &&
          currentStep === 6 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 10000 &&
          values.identification_type === 'foreign_identification_number') ||
        (values.loan_amount_requested > +values.six_months_income &&
          currentStep === 6 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 40000 &&
          values.identification_type === 'foreign_identification_number') ||
        (values.loan_amount_requested > 3000 &&
          currentStep === 6 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 40000 &&
          10000 <= (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) &&
          values.identification_type === 'foreign_identification_number')
      ) {
        if (
          values.loan_amount_requested > 3000 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 20000 &&
          values.identification_type === 'singapore_nric_no'
        ) {
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Cannot borrow more than $3000`,
          })
        }

        if (
          values.loan_amount_requested > +values.six_months_income &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 20000 &&
          values.identification_type === 'singapore_nric_no'
        ) {
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Cannot borrow more than $${+values.six_months_income}`,
          })
        }

        if (
          values.loan_amount_requested > 500 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) < 10000 &&
          values.identification_type === 'foreign_identification_number'
        ) {
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Cannot borrow more than $500 `,
          })
        }

        if (
          values.loan_amount_requested > +values.six_months_income &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) >= 40000 &&
          values.identification_type === 'foreign_identification_number'
        ) {
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Cannot borrow more than $${+values.six_months_income}`,
          })
        }

        if (
          values.loan_amount_requested > 3000 &&
          (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) <= 40000 &&
          10000 <= (+values.six_months_income * 2 === 0 ? 1 : +values.six_months_income * 2) &&
          values.identification_type === 'foreign_identification_number'
        ) {
          swalToast.fire({
            timer: 1500,
            icon: 'error',
            title: `Cannot borrow more than $3000`,
          })
        }
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

  /**
   * handle create or edit applocation
   * @param isDraft status of application
   */
  async function handleSubmitForm(isDraft: boolean = false) {
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
      is_existing,
      residential_type,
      loan_reason,
      country_id,
      file_documents,
      customer_no,
      application_no,
      job_type_id,
      interest,
      bankrupt_plan,
      bankrupted,
      amount,
      date,
      employer,
      month,
      vehicle_no,
      vehicle_model,
      vehicle_coe_category,
      vehicle_coe_expiry_date,
      vehicle_effective_date,
      vehicle_maker,
      vehicle_open_maket_value,
      vehicle_type,
    } = values

    const addressList = address_contact_info
      .filter((item) => item.address_type_id)
      .map((item) => ({
        ...item,
        address_type_id: +item.address_type_id,
      }))

    const {applicationId, bankInfoId, borrowerId, customerId, employmentId, cpfId} = listIdEdit

    const payload: ApplicationPayload = {
      customer: {
        ...(customerId && applicationIdEdit ? {id: customerId} : {}),
        company_id: +company_id,
        country_id: +country_id,
        customer_no: customer_no || '',
        identification_type,
        identification_no,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : '',
        firstname,
        lastname,
        middlename,
        gender,
      },
      borrower: {
        ...(borrowerId && applicationIdEdit ? {id: borrowerId} : {}),
        email_1,
        email_2,
        employment_status,
        mobilephone_1: String(mobilephone_1),
        mobilephone_2: String(mobilephone_2),
        mobilephone_3: String(mobilephone_3),
        homephone: String(homephone),
        monthly_income: +monthly_income || 0,
        job_type_id: +job_type_id || null,
        spoken_language,
        marketing_type_id: +marketing_type_id,
        residential_type,
      },
      bank_account: {
        ...(bankInfoId && applicationIdEdit ? {id: bankInfoId} : {}),
        account_number_1,
        account_number_2,
        bank_code_1,
        bank_code_2,
        bank_name_1,
        bank_name_2,
      },
      employment: {
        ...(employmentId && applicationIdEdit ? {id: employmentId} : {}),
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
        bankrupt_plan: bankrupt_plan ? 1 : 0,
        bankrupted: bankrupted ? 1 : 0,
      },
      application: {
        ...(applicationId && applicationIdEdit ? {id: applicationId} : {}),
        loan_terms: +loan_terms,
        loan_amount_requested: +loan_amount_requested,
        loan_type_id: +loan_type_id || null,
        status: isDraft ? 0 : 1,
        application_date: new Date(),
        application_notes: JSON.stringify(remarkList),
        application_no,
        is_existing,
        company_id: +company_id,
        loan_reason,
        interest: +interest,
      },
      address: addressList,
      file_documents,

      cpf: {
        ...(cpfId && applicationIdEdit && singpass ? {id: cpfId} : {}),
        amount: JSON.stringify(amount),
        date: JSON.stringify(date),
        employer: JSON.stringify(employer),
        month: JSON.stringify(month),
      },
    }
    try {
      setSubmitting(true)
      if (applicationIdEdit) {
        await request.put('/application/detail/' + applicationIdEdit, payload)

        handleGetApplicationById()
        setCurrentStep(1)

        swalToast.fire({
          title: isDraft
            ? 'Application draft successfully updated'
            : 'Application successfully updated',
          icon: 'success',
        })
      } else {
        const {data} = await request.post<CreateSuccessResponse>('/application/create', payload)
        const {id} = data || {}

        if (id) {
          navigate(`/application/edit/${id}`)
          resetForm()
          setCurrentStep(1)
        }

        swalToast.fire({
          title: isDraft
            ? 'Application draft successfully created'
            : 'Application successfully created',
          icon: 'success',
        })
      }

      // When create successfully -> all user current company will receive notification
      !applicationIdEdit && socket?.emit('createApplicationSuccess', 1)
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) return null

  if (errorLoading) {
    return <NotFoundPage />
  }

  return (
    <>
      <div className='position-fixed' style={{zIndex: '1000000'}}>
        {showRemark && (
          <div className='wrapper-show-remark'>
            <div
              onClick={() => {
                setShowRemark(!showRemark)
              }}
              className='w-100 h-100'
            ></div>
            <Remark
              handleOnClose={() => {
                setShowRemark(!showRemark)
              }}
              setRemarkList={setRemarkList}
              idUpdate={applicationIdEdit}
              remarkList={remarkList}
            />
          </div>
        )}
      </div>

      <PageTitle breadcrumbs={profileBreadCrumbs}>
        {applicationIdEdit ? 'Edit Application' : 'New Application'}
      </PageTitle>

      <div className='row gx-3 gx-xl-6 gy-8 overflow-hidden flex-grow-1 m-0'>
        <div className='col-12 col-xxl-3 col-2xxl-2 d-flex flex-column overflow-hidden h-unset h-2xxl-100 m-xxl-0 ps-0'>
          <div className='card bg-white w-100 align-self-start align-self-lg-center overflow-y-auto m-0 d-flex flex-column h-100'>
            <div className='step-application h-fit-content my-auto'>
              <Step
                className='d-flex flex-row flex-xxl-column align-items-center align-items-xxl-start gap-16px gap-xxl-0 overflow-x-auto p-10'
                data={_STEP_APPLICATION}
                stepCompleted={stepCompleted}
                currentStep={currentStep}
                onGoToStep={handleGoToStep}
              />
            </div>
          </div>
        </div>
        <div className='col-12 col-xxl-9 col-2xxl-8 d-flex flex-column h-fit-content h-2xxl-100 mt-16px m-xxl-0 ps-0'>
          <div className='application-details-form d-flex flex-column card card-body p-0 m-0'>
            <HeaderApplication
              labelStep={`${STEP_APPLICATION[currentStep - 1].label}`}
              info={{
                application_no: values.application_no || '',
                application_date: values.application_date || '',
              }}
              percentCompleted={percentCompleted}
              className='p-10'
            />

            {!!rejectionOne?.id && (
              <div className='px-30px pt-30px'>
                <div className='p-16px wrapper-reject-title-application'>
                  <h1 className='h1-reject-title-application'>
                    Reject Reason:{' '}
                    {
                      optionsRejectionType.filter(
                        (data: any) => data?.id === rejectionOne?.rejection_type_id
                      )[0]?.rejection_type_name
                    }
                  </h1>
                  <p className='p1-reject-title-application'>
                    Rejected By{' '}
                    {
                      optionsUser.filter((data: any) => data?.id === rejectionOne?.rejected_by)[0]
                        ?.firstname
                    }{' '}
                    {
                      optionsUser.filter((data: any) => data?.id === rejectionOne?.rejected_by)[0]
                        ?.middlename
                    }{' '}
                    {
                      optionsUser.filter((data: any) => data?.id === rejectionOne?.rejected_by)[0]
                        ?.lastname
                    }
                  </p>
                  <p
                    className='p2-reject-title-application'
                    dangerouslySetInnerHTML={{
                      __html: rejectionOne?.rejection_note.replace(/\n/g, '<br>'),
                    }}
                  />
                </div>
              </div>
            )}

            {values.approval && (
              <div className='p-30px pb-0'>
                <div className='p-16px bg-light-success rounded-8'>
                  <h1 className='text-success fs-16 fw-bold m-0'>
                    Approved By: {values.approval.approved_by}
                  </h1>
                  {values.approval.approved_note && (
                    <span className='text-gray-600 mt-16px d-inline-block white-space-pre-line'>
                      {values.approval.approved_note}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div
              className='overflow-lg-auto p-10 flex-grow-1 d-flex justify-content-center'
              ref={containerRef}
            >
              <div
                className={clsx([
                  currentStep !== 6 && 'form-wrap',
                  currentStep === 3 && 'w-100',
                  currentStep === 2 && 'w-90',
                ])}
              >
                {CurrentComponentControl && (
                  <CurrentComponentControl
                    setStepCompleted={setStepCompleted}
                    config={STEP_APPLICATION[currentStep - 1].config || []}
                    formik={formik}
                    setSingpass={setSingpass}
                    singpass={singpass}
                  />
                )}
                {show && (
                  <Reject
                    handleloadApi={() => SetLoadApiEdit(!loadApiEdit)}
                    id={applicationIdEdit}
                    show={show}
                    rejection_one={rejectionOne}
                    handleClose={() => setShow(!show)}
                  />
                )}
                <GeneralButton
                  data={data}
                  setStepCompleted={setStepCompleted}
                  handleClose={() => setShow(!show)}
                  handleSaveDraft={handleSaveDraft}
                  handleSubmit={handleBeforeSubmit}
                  handleReloadApi={() => SetLoadApiEdit(!loadApiEdit)}
                  config={STEP_APPLICATION[currentStep - 1].config || []}
                  formik={formik}
                  isDraft={isDraft}
                  currentStep={currentStep}
                  setSingpass={setSingpass}
                  singpass={singpass}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-2xxl-2 m-0 h-unset h-xxl-100 mt-16px mt-2xxl-0 ps-0'>
          <div className='d-flex flex-column h-100'>
            <div className='d-none d-2xxl-block'>
              <div style={{height: 'calc(100% -50px)'}} className='pb-30px'>
                <BackgroundCheck data={data} />
              </div>

              <button
                onClick={() => {
                  setShowRemark(!showRemark)
                }}
                className='btn-remark d-flex justify-content-center align-items-center '
              >
                <div className='d-flex w-100 d-flex justify-content-center align-items-center'>
                  <Icons name={'Mes'} />
                  <span className='span-button-remark ms-8px pt-1px'>Remark</span>
                </div>
              </button>
            </div>

            <div className='wrapper-button-remark overflow-hidden min-h-300px min-h-xxl-unset'>
              <div className='d-block d-2xxl-none'>
                <Remark
                  handleOnClose={() => {
                    setShowRemark(!showRemark)
                  }}
                  small={true}
                  setRemarkList={setRemarkList}
                  idUpdate={applicationIdEdit}
                  remarkList={remarkList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
