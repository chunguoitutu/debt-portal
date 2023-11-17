import * as React from 'react'
import {COMPANY_MANAGEMENT_CONFIG} from './config'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import Input from '../../../components/input'
import ErrorMessage from '../../../components/error/ErrorMessage'
import Button from '../../../components/button/Button'
import request from '../../../app/axios'
import {swalToast} from '../../../app/swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../app/constants/error-message'

export const CompanyManagement = () => {
  const {endpoint, rows} = COMPANY_MANAGEMENT_CONFIG
  const [information, setInformation] = React.useState<any>(null)
  const [loadapi, setLoadApi] = React.useState<any>(false)

  const newCompaniesSchema = Yup.object().shape({
    company_name: Yup.string().required('Company Name is required'),
    business_uen: Yup.string().required('Business Uen is required'),
    telephone: Yup.string()
      .min(6, 'Minimum 6 symbols')
      .max(11, 'Maximum 11 symbols')
      .required('Telephone is required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    open_date: Yup.string().required('Open Date is required'),
    address: Yup.string().required('Address is required'),
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

  const formik = useFormik({
    initialValues: {},
    validationSchema: newCompaniesSchema,
    onSubmit: async (values: any, actions: any) => {
      await request
        .post('config/company/1', {
          company_name: values.company_name,
          company_code: values.company_code,
          business_uen: values.business_uen,
          telephone: values.telephone,
          email: values.email,
          website: values.website,
          open_date: new Date(values.open_date),
        })
        .then((response) => {
          if (!response.data?.error) {
            swalToast.fire({
              icon: 'success',
              title: 'Company successfully updated',
            })
          }
        })
        .catch((error) =>
          swalToast.fire({
            icon: 'error',
            title: DEFAULT_MSG_ERROR,
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
    handleChange,
    handleSubmit,
    setFieldValue,
    setSubmitting,
  } = formik

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
          <button
            type='reset'
            onClick={() => setLoadApi(!loadapi)}
            className='btn btn-secondary align-self-center me-3'
          >
            Discard
          </button>

          <Button
            className='btn-lg btn-primary'
            disabled={isSubmitting}
            loading={isSubmitting}
            onClick={() => handleSubmit()}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}
