import * as React from 'react'
import {COMPANY_MANAGEMENT_CONFIG} from './config'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import Input from '@/components/input'
import ErrorMessage from '@/components/error/ErrorMessage'
import Button from '@/components/button/Button'
import request from '../../../app/axios'
import {swalToast} from '../../../app/swal-notification'

export const CompanyManagement = () => {
  const {endpoint, rows} = COMPANY_MANAGEMENT_CONFIG
  const [information, setInformation] = React.useState<any>(null)
  const [loadapi, setLoadApi] = React.useState<any>(false)

  const newCompaniesSchema = Yup.object().shape({
    company_name: Yup.string()
      .required('Company Name is required')
      .max(255, 'Company Name must be at most 255 characters'),
    company_code: Yup.string()
      .required('Company Code is required')
      .max(64, 'Company Code must be at most 64 characters'),
    business_uen: Yup.string()
      .required('Business UEN is required')
      .max(64, 'Business UEN must be at most 64 characters'),
    telephone: Yup.string().max(64, 'Telephone must be at most 64 characters'),
    email: Yup.string()
      .email('Email is not in valid format')
      .max(255, 'Email must be at most 255 characters'),
    open_date: Yup.string().required('Open Date is required'),
    address: Yup.string().max(255, 'Address must be at most 255 characters'),
    contact_person: Yup.string().min(0).max(255, 'Contact Person must be at most 255 characters'),
  })

  React.useEffect(() => {
    request
      .get(endpoint)
      .then(({data}) => {
        if (!data?.error) setInformation(data?.data)

        const information = data?.data

        rows.forEach((row) => {
          if (row.key === 'open_date') {
            setFieldValue(row.key, moment(information?.['open_date']).format('YYYY-MM-DD'), false)
          } else {
            setFieldValue(row.key, information[row.key], false)
          }
        }, {})
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadapi])

  const formik = useFormik<any>({
    initialValues: {} as any,
    validationSchema: newCompaniesSchema,
    onSubmit: async (values: any, actions: any) => {
      await request
        .post('config/company/1', {
          company_name: values.company_name.trim(),
          company_code: values.company_code.trim(),
          business_uen: values.business_uen.trim(),
          telephone: values.telephone.trim(),
          contact_person: values.contact_person.trim(),
          email: values.email.trim(),
          open_date: new Date(values.open_date),
        })
        .then((response) => {
          if (!response.data?.error) {
            setLoadApi(!loadapi)
            swalToast.fire({
              icon: 'success',
              title: `Company${
                !!response?.data?.data?.company_name
                  ? ' "' + response?.data?.data?.company_name + '" '
                  : ' '
              }successfully updated`,
            })
          }
        })
        .catch((error) =>
          swalToast.fire({
            icon: 'error',
            title:
              error?.response?.data?.message ||
              'The system is having an error, please try again in a few minutes',
          })
        )
        .finally(() => setSubmitting(false))
    },
  })

  const {
    values,
    touched,
    errors,
    isSubmitting,
    validateForm,
    setTouched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setSubmitting,
  } = formik

  const handleBeforeSubmit = async () => {
    const checkingErrors = await validateForm(values)
    if (Object.keys(checkingErrors).length) {
      const error = Object.keys(checkingErrors).reduce((acc, curr) => ({...acc, [curr]: true}), {})
      setTouched({
        ...touched,
        ...error,
      })
    } else {
      handleSubmit()
    }
  }

  return (
    <div className='card'>
      <div className='card-body row g-10'>
        {information ? (
          <>
            {rows.map((row) => (
              <div key={row.key} style={{flex: '0 0 50%'}}>
                <div className='d-flex flex-column'>
                  <Input
                    required={row?.require ? true : false}
                    title={row.name}
                    name={row.key}
                    value={values[row.key] || ''}
                    onChange={handleChange}
                    type={row.type}
                  />

                  {errors[row?.key] && touched[row?.key] && (
                    <ErrorMessage className='mt-2' message={errors[row?.key] as string} />
                  )}
                </div>
              </div>
            ))}
          </>
        ) : null}
        <div className='d-flex flex-end pt-10'>
          <Button
            type='reset'
            onClick={() => setLoadApi(!loadapi)}
            className='btn-lg btn-secondary align-self-center me-8px'
          >
            Discard
          </Button>

          <Button
            className='btn-lg btn-primary'
            disabled={
              isSubmitting ||
              ((information?.company_name || '').trim() === (values?.company_name || '').trim() &&
                (information?.company_code || '').trim() === (values?.company_code || '').trim() &&
                (information?.business_uen || '').trim() === (values?.business_uen || '').trim() &&
                (information?.contact_person || '').trim() ===
                  (values?.contact_person || '').trim() &&
                (information?.address || '').trim() === (values?.address || '').trim() &&
                (information?.email || '').trim() === (values?.email || '').trim() &&
                Number(information?.telephone) ===
                  Number(!!values?.telephone ? values?.telephone : 0) &&
                moment(information?.['open_date']).format('YYYY-MM-DD') ===
                  moment(values?.['open_date']).format('YYYY-MM-DD'))
            }
            loading={isSubmitting}
            onClick={() => handleBeforeSubmit()}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}
