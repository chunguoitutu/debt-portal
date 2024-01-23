import * as React from 'react'
import {useFormik} from 'formik'
import moment from 'moment'

import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {swalToast} from '@/app/swal-notification'
import request from '@/app/axios'
import {CREATE_COMPANY_CONFIG} from './config'

export const Organization = () => {
  const {settings, rows} = CREATE_COMPANY_CONFIG('Organization')
  const {endpoint, validationFormik} = settings || {}
  const [information, setInformation] = React.useState<any>(null)
  const [loadapi, setLoadApi] = React.useState<any>(false)

  React.useEffect(() => {
    request
      .get(endpoint)
      .then(({data}) => {
        if (!data?.error) setInformation(data?.data)

        const information = data?.data

        rows.forEach((row) => {
          if (row.key === 'open_date') {
            setFieldValue(row.key, moment(information?.['open_date']).format('YYYY-MM-DD'), false)
          } else if (row.key === 'license_expiry_date') {
            setFieldValue(
              row.key,
              moment(information?.['license_expiry_date']).format('YYYY-MM-DD'),
              false
            )
          } else {
            setFieldValue(row.key, information[row.key], false)
          }
        })
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadapi])

  const formik = useFormik<any>({
    initialValues: {} as any,
    validationSchema: validationFormik,
    onSubmit: async (values: any, actions: any) => {
      await request
        .put('config/company/1', {
          company_name: values.company_name.trim(),
          company_code: values.company_code.trim(),
          business_uen: values.business_uen.trim(),
          telephone: values.telephone.trim(),
          contact_person: values.contact_person.trim(),
          email: values.email.trim(),
          open_date: new Date(values.open_date),
          license_no: values.license_no.trim(),
          license_expiry_date: new Date(values.license_expiry_date),
          web_url: values.web_url.trim(),
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
                    required={row?.required ? true : false}
                    label={row.name}
                    name={row.key}
                    value={values[row.key] || ''}
                    onChange={handleChange}
                    type={row.type}
                    error={errors[row.key] as string}
                    touched={!!touched[row.key]}
                  />
                </div>
              </div>
            ))}
          </>
        ) : null}
        <div className='d-flex flex-end pt-10'>
          <Button
            disabled={
              isSubmitting ||
              ((information?.company_name || '').trim() === (values?.company_name || '').trim() &&
                (information?.company_code || '').trim() === (values?.company_code || '').trim() &&
                (information?.business_uen || '').trim() === (values?.business_uen || '').trim() &&
                (information?.license_no || '').trim() === (values?.license_no || '').trim() &&
                (information?.web_url || '').trim() === (values?.web_url || '').trim() &&
                (information?.contact_person || '').trim() ===
                  (values?.contact_person || '').trim() &&
                (information?.address || '').trim() === (values?.address || '').trim() &&
                (information?.email || '').trim() === (values?.email || '').trim() &&
                Number(information?.telephone) ===
                  Number(!!values?.telephone ? values?.telephone : 0) &&
                moment(information?.['open_date']).format('YYYY-MM-DD') ===
                  moment(values?.['open_date']).format('YYYY-MM-DD') &&
                moment(information?.['license_expiry_date']).format('YYYY-MM-DD') ===
                  moment(values?.['license_expiry_date']).format('YYYY-MM-DD'))
            }
            type='reset'
            onClick={() => setLoadApi(!loadapi)}
            className='btn-lg btn-secondary align-self-center me-8px fs-6'
          >
            Discard
          </Button>

          <Button
            className='btn btn-primary'
            style={{fontSize: 14}}
            disabled={
              isSubmitting ||
              ((information?.company_name || '').trim() === (values?.company_name || '').trim() &&
                (information?.company_code || '').trim() === (values?.company_code || '').trim() &&
                (information?.business_uen || '').trim() === (values?.business_uen || '').trim() &&
                (information?.license_no || '').trim() === (values?.license_no || '').trim() &&
                (information?.web_url || '').trim() === (values?.web_url || '').trim() &&
                (information?.contact_person || '').trim() ===
                  (values?.contact_person || '').trim() &&
                (information?.address || '').trim() === (values?.address || '').trim() &&
                (information?.email || '').trim() === (values?.email || '').trim() &&
                Number(information?.telephone) ===
                  Number(!!values?.telephone ? values?.telephone : 0) &&
                moment(information?.['open_date']).format('YYYY-MM-DD') ===
                  moment(values?.['open_date']).format('YYYY-MM-DD') &&
                moment(information?.['license_expiry_date']).format('YYYY-MM-DD') ===
                  moment(values?.['license_expiry_date']).format('YYYY-MM-DD'))
            }
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
