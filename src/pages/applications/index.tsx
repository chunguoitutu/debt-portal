import {FC, useEffect, useMemo, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import moment from 'moment'
import './style.scss'
import BackgroundCheck from './background-check/BackgroundCheck'
import Step from '../../components/step/Step'
import HeaderApplication from '../../components/applications/HeaderApplication'
import Remark from './remark/Remark'
import Cookies from 'js-cookie'
import * as Yup from 'yup'
import {BLOCK_ADDRESS_CONFIG} from './step-component/config'
import {useFormik} from 'formik'
import GeneralButton from './step-component/GeneralButton'
import NotFoundPage from '../not-found-page/NotFoundPage'
import {PageLink, PageTitle} from '../../_metronic/layout/core'
import {
  ApplicationFormData,
  ApplicationPayload,
  PropsStepApplication,
  RemarkItem,
  StepItem,
} from '../../app/types/common'
import {STEP_APPLICATION} from '../../app/constants/step'
import {INIT_BLOCK_ADDRESS} from '../../app/constants'
import request from '../../app/axios'
import {useAuth} from '../../app/context/AuthContext'
import {filterObjectKeyNotEmpty} from '../../app/utils'
import {DEFAULT_MSG_ERROR} from '../../app/constants/error-message'
import {swalToast} from '../../app/swal-notification'
import {CreateSuccessResponse} from '../../app/types/response'

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
}

export const Applications = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isDraft, setIsDraft] = useState<boolean>(false)
  const [remarkList, setRemarkList] = useState<RemarkItem[]>([])
  const [stepCompleted, setStepCompleted] = useState<number>(0)
  const [errorLoading, setErrorLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listIdEdit, setListIdEdit] = useState<ListIdEdit>({
    customerId: 0,
    borrowerId: 0,
    employmentId: 0,
    applicationId: 0,
    bankInfoId: 0,
  })
  const {pathname} = useLocation()

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

  const {applicationIdEdit} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!applicationIdEdit) return setIsLoading(false)
    handleGetApplicationById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationIdEdit])

  useEffect(() => {
    resetForm()
    setStepCompleted(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

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
  }, [values])

  async function handleGetApplicationById() {
    try {
      const {data} = await request.get(`/application/detail/${applicationIdEdit}`)

      const {borrower, application, customer, bank_info, employment, address, file_documents} =
        data.data || {}
      const formattedDateOfBirth = moment(customer?.date_of_birth).format('YYYY-MM-DD')

      setValues({
        ...values,
        ...borrower,
        ...application,
        ...customer,
        ...bank_info,
        ...employment,
        address_contact_info:
          Array.isArray(address) && address.length ? [...address] : values.address_contact_info,
        date_of_birth: formattedDateOfBirth,
        file_documents:
          file_documents.map((data) => {
            return {...data, base64: 'data:application/pdf;base64,' + data?.base64}
          }) || [],
      })

      if (application?.is_draft !== 1) {
        setStepCompleted(STEP_APPLICATION.length - 1)
      }

      setListIdEdit({
        customerId: customer?.id || 0,
        borrowerId: borrower?.id || 0,
        employmentId: employment?.id || 0,
        applicationId: application?.id || 0,
        bankInfoId: bank_info?.id || 0,
      })

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
        handleSubmitForm()
      }
    })
  }

  function handleBeforeSubmit() {
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
      is_existing,
      residential_type,
      loan_reason,
      country_id,
      file_documents,
      customer_no,
    } = values

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

    const {applicationId, bankInfoId, borrowerId, customerId, employmentId} = listIdEdit

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
        job_type_id: 1,
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
      },
      application: {
        ...(applicationId && applicationIdEdit ? {id: applicationId} : {}),
        loan_terms: +loan_terms,
        loan_amount_requested: +loan_amount_requested,
        loan_type_id: +loan_type_id,
        status: 1,
        application_date: new Date(),
        application_notes: JSON.stringify(remarkList),
        is_draft: isDraft ? 1 : 0,
        is_existing,
        company_id: +company_id,
        loan_reason,
      },
      address: addressList,
      file_documents,
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
    } catch (error: any) {
      const message = DEFAULT_MSG_ERROR

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
      <PageTitle breadcrumbs={profileBreadCrumbs}>
        {applicationIdEdit ? 'Edit Application' : 'New Application'}
      </PageTitle>
      <div className='row gx-3 gx-xl-6 gy-8 overflow-hidden flex-grow-1 m-0'>
        <div className='col-3 col-xxl-2 order-1 d-flex flex-column overflow-hidden h-100 m-0'>
          <div className='card bg-white h-100 align-self-start align-self-lg-center overflow-y-auto p-10 m-0 d-flex flex-column'>
            <div className='h-fit-content my-auto'>
              <Step
                data={_STEP_APPLICATION}
                stepCompleted={stepCompleted}
                currentStep={currentStep}
                onGoToStep={handleGoToStep}
              />
            </div>
          </div>
        </div>
        <div className='col-9 col-xxl-8 order-2 d-flex flex-column h-100 m-0'>
          <div className='application-details-form d-flex flex-column card card-body p-0 m-0'>
            <HeaderApplication
              labelStep={`${currentStep}. ${STEP_APPLICATION[currentStep - 1].label}`}
              info={{
                initialValues: values.customer_no,
                date: values.application_date,
              }}
              percentCompleted={percentCompleted}
              className='p-10'
            />

            <div className='overflow-lg-auto p-10 flex-grow-1'>
              <div
                className={`${currentStep !== 6 ? 'form-wrap' : ''}`}
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
          </div>
        </div>
        <div className='d-none d-xxl-flex col-xxl-2 order-0 order-xxl-3 h-100 m-0'>
          <div className='d-flex flex-column h-100'>
            <div className='pb-6'>
              <BackgroundCheck />
            </div>
            <div className='flex-grow-1 overflow-hidden'>
              <Remark setRemarkList={setRemarkList} remarkList={remarkList} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
