import {FC, Fragment, useEffect, useMemo} from 'react'
import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import clsx from 'clsx'
import Button from '../../../../components/button/Button'
import * as Yup from 'yup'
import {useFormik} from 'formik'

const Employment: FC<PropsStepApplication> = ({
  changeStep,
  formData,
  setFormData,
  config = [],
  onGoToStep,
  setChangeStep,
}) => {
  useEffect(() => {
    if (!changeStep) return

    validateForm().then((objectError) => {
      if (Object.keys(objectError).length > 0) {
        setErrors(objectError)
        setTouched(
          Object.keys(objectError).reduce((result, current) => ({...result, [current]: true}), {})
        )
        setChangeStep(undefined)
      } else {
        onGoToStep(changeStep)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeStep])

  const initialValues = useMemo(() => {
    return config.reduce(
      (result, current) => ({
        ...result,
        [current.key]: formData[current.key] || current.defaultValue || '',
      }),
      {}
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  const schema = useMemo(() => {
    const schemaObject = config
      .filter((item) => item.required)
      .reduce(
        (result, current) => ({
          ...result,
          [current.key]: Yup.string().required(
            `${current.labelError || current.label} is required.`
          ),
        }),
        {}
      )
    return Yup.object().shape(schemaObject)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  const {touched, errors, handleChange, handleSubmit, validateForm, setErrors, setTouched} =
    useFormik({
      initialValues,
      validationSchema: schema,
      onSubmit: () => onGoToStep(),
    })

  function handleChangeData(e: React.ChangeEvent<any>) {
    const {value, type, checked, name} = e.target

    // formik
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

  function renderComponent(item: ApplicationConfig) {
    const {key, data = [], isFullLayout, column, options, typeInput, desc} = item
    let Component: any = item?.component

    const className =
      isFullLayout || !column
        ? 'flex-grow-1 w-300px w-lg-unset'
        : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    // nothing
    if (!Component) return

    // Special cases should be checked in advance
    if (key === 'monthly_income_1') {
      return (
        <Component
          formData={formData}
          onChange={handleChangeData}
          errors={errors}
          touched={touched}
        />
      )
    }
    // End special cases

    // handle for select
    if (Component.name === 'Select') {
      return (
        <Component
          value={formData[key]}
          onChange={handleChangeData}
          name={key}
          classShared={className}
          options={options}
        />
      )
    }

    // handle for radio
    if (Component.name === 'Radio') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([formData[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={formData[key] === item.value}
          value={item.value}
          onChange={handleChangeData}
        />
      ))
    }

    // handle for checkbox
    if (Component.name === 'Checkbox') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([formData[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={formData[key].includes(item.value.toString())}
          value={item.value}
          onChange={handleChangeData}
        />
      ))
    }

    // handle for Input Advanced type input is money
    if (Component.name === 'InputAdvance') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={formData[key]}
            onChange={handleChangeData}
            name={key}
            classShared={className}
            typeInput={typeInput}
          />

          {desc && <span className='text-gray-600 mt-2 fs-sm'>{desc}</span>}
        </div>
      )
    }

    if (Component.name === 'Input' || Component.name === 'InputTime') {
      return (
        <Component
          value={formData[key]}
          onChange={handleChangeData}
          name={key}
          classShared={className}
        />
      )
    }

    // unexpected
    return <Component />
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, isFullLayout, column, isHide, className, required} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
              isFullLayout || !column ? 'full' : '',
              className,
            ])}
            key={i}
          >
            <div
              className={clsx([
                'input-title-application left fs-4 text-start text-lg-end',
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
        <Button onClick={() => handleSubmit()}>Continue</Button>
      </div>
    </>
  )
}

export default Employment
