import {useFormik} from 'formik'
import {Input} from '@/components/input'
import Button from '@/components/button/Button'
import {swalToast} from '@/app/swal-notification'
import request from '@/app/axios'
import {CREATE_COMPANY_CONFIG} from './config'
import {COUNTRY_PHONE_CODE, convertErrorMessageResponse, formatDate} from '@/app/utils'
import {FC, useMemo} from 'react'
import Tippy from '@tippyjs/react'
import {Select} from '@/components/select'
import {CompanyItem, DataResponse} from '@/app/types'

type Props = {
  onGetOrganization: () => void
  data: CompanyItem
}

const EditOrganization: FC<Props> = ({data, onGetOrganization}) => {
  const {settings, rows} = CREATE_COMPANY_CONFIG('Organization')
  const {validation} = settings || {}

  const generateField = useMemo(() => {
    return rows.reduce((acc, config) => {
      const valueEdit = config.type === 'date' ? formatDate(data?.[config.key]) : data?.[config.key]
      return {
        ...acc,
        [config.key]: data ? valueEdit : config.defaultValue || '',
      }
    }, {} as CompanyItem)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const {values, touched, errors, isSubmitting, dirty, handleChange, handleSubmit, setSubmitting} =
    useFormik({
      initialValues: generateField,
      validationSchema: validation,
      validateOnChange: false,
      onSubmit: handleUpdateOrganization,
    })

  async function handleUpdateOrganization() {
    const payload = validation.cast(values)

    try {
      const {data} = await request.put<DataResponse<CompanyItem>>('config/company/1', payload)

      onGetOrganization()
      swalToast.fire({
        icon: 'success',
        title: `Organization "${data?.data?.company_name}" successfully updated`,
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: convertErrorMessageResponse(error),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='card h-100'>
      <div className='card-body row g-16px gx-32px'>
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
                  transparent
                  insertLeft={
                    row.type === 'phone' ? (
                      <Tippy
                        offset={[120, 0]}
                        content='Please choose the phone number you prefer'
                        disabled
                      >
                        {/* Wrapper with a span tag to show tooltip */}
                        <span>
                          <Select
                            onChange={handleChange}
                            value={values[row.key]}
                            isOptionDefault={false}
                            classShared='m-0'
                            className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                            name='country_phone_code'
                            options={COUNTRY_PHONE_CODE}
                            disabled={true}
                          />
                        </span>
                      </Tippy>
                    ) : undefined
                  }
                />
              </div>
            </div>
          ))}
        </>
        <div className='d-flex flex-end pt-10'>
          <Button
            disabled={isSubmitting || !dirty}
            type='reset'
            onClick={onGetOrganization}
            className='btn-lg btn-secondary align-self-center me-8px fs-6'
          >
            Discard
          </Button>

          <Button
            className='btn btn-primary'
            style={{fontSize: 14}}
            disabled={isSubmitting || !dirty}
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

export default EditOrganization
