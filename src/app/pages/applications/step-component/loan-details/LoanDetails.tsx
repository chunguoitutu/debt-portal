import clsx from 'clsx'
import {FC, Fragment, useMemo} from 'react'
import * as Yup from 'yup'

import Button from '../../../../components/button/Button'
import ErrorMessage from '../../../../components/error/ErrorMessage'
import {useFormik} from 'formik'
import {PropsStepApplication} from '../../../../modules/auth'

export const schema = Yup.object().shape({
  loan_type: Yup.string().required('Loan Type is required.').max(255, 'Maximum 255 symbols'),
  loan_amount_required: Yup.string()
    .required('Loan Amount Required is required.')
    .max(255, 'Maximum 255 symbols'),
  reason_for_loan: Yup.string()
    .required('Reason For Loan is required.')
    .max(255, 'Maximum 255 symbols'),
})

const LoanDetails: FC<PropsStepApplication> = ({
  formData,
  setFormData,
  config = [],
  onNextStep,
}) => {
  const initialValues = useMemo(() => {
    return config.reduce(
      (result, current) => ({...result, [current.key]: current.defaultValue || ''}),
      {}
    )
  }, [config])

  const {touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: onNextStep,
  })

  function handleChangeData(e: React.ChangeEvent<any>) {
    const {value, type, checked, name} = e.target

    //formik
    handleChange(e)

    if (type === 'checkbox') {
      return setFormData({
        ...formData,
        [name]: Array.isArray(formData[name])
          ? formData[name].includes(value)
            ? Array.from(formData[name]).filter((item) => item !== value)
            : [...Array.from(typeof formData[name] === 'string' ? '' : formData[name]), value]
          : checked,
      })
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function renderComponent(item) {
    const {key, data = [], isFullLayout, column} = item
    let Component = item?.component

    // nothing
    if (!Component) return

    if (Component.name === 'Checkbox') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([formData[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={formData[key].includes(item.value)}
          value={item.value}
          onChange={handleChangeData}
        />
      ))
    }

    if (Component.name === 'TextArea') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            classShared='flex-grow-1'
            value={item.value}
            onChange={handleChangeData}
            name={key}
            touched={touched}
            errors={errors}
          />
          <ErrorMessage
            shouldShowMessage={!!errors[key] && !!touched[key]}
            message={errors[key] as string}
          />
        </div>
      )
    }

    const className = isFullLayout || !column ? 'flex-grow-1' : 'input-wrap flex-shrink-0'

    return (
      <div className='d-flex flex-column w-100'>
        <Component
          value={item.value}
          onChange={handleChangeData}
          name={key}
          classShared={className}
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
        />
      </div>
    )
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, isFullLayout, column, isHide, required} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={`d-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8  ${
              isFullLayout || !column ? 'full' : ''
            }`}
            key={i}
          >
            <div
              className={clsx([
                'input-title-application-step2 left fs-4 text-start text-lg-end',
                required && 'required',
              ])}
            >
              {label}
            </div>

            {renderComponent(item)}
          </div>
        )
      })}
      <div className='d-flex flex-end mt-10 full'>
        <Button
          onClick={() => {}}
          className='btn-secondary align-self-center me-3'
          disabled={false}
        >
          Save Draft
        </Button>
        <Button loading={false} disabled={false} onClick={() => handleSubmit()}>
          Continue
        </Button>
      </div>
    </>
  )
}
export default LoanDetails
