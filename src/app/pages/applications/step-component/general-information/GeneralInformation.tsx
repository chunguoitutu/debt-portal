import clsx from 'clsx'
import {FC, Fragment, useMemo} from 'react'
import * as Yup from 'yup'
import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {useFormik} from 'formik'
import Button from '../../../../components/button/Button'
import ErrorMessage from '../../../../components/error/ErrorMessage'

export const schema = Yup.object().shape({
  last_name: Yup.string().required('Last Name is required.').max(255, 'Maximum 255 symbols'),
  first_name: Yup.string().required('First Name is required.').max(255, 'Maximum 255 symbols'),
  middle_name: Yup.string().max(255, 'Maximum 255 symbols'),
  id_type: Yup.string().required('ID Type is required.'),
  nric_no: Yup.string().required('NRIC No./FIN is required.'),
  residential_type: Yup.string().required('Residential Type is required.'),
  marketing_type: Yup.string().required('Marketing Type is required.'),
  gender: Yup.string().required('Gender is required.'),
  date_of_birth: Yup.string().required('Date of Birth is required.'),
  nationality: Yup.string().required('Nationality is required.'),
})

const GeneralInformation: FC<PropsStepApplication> = ({
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
    const {key, data = [], isFullLayout, column, options} = item
    let Component: any = item?.component

    const className =
      isFullLayout || !column
        ? 'flex-grow-1 w-sm-300px'
        : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

    // nothing
    if (!Component) return

    // Special cases should be checked in advance
    if (key === 'firstname') {
      return (
        <Component
          formData={formData}
          onChange={handleChangeData}
          errors={errors}
          touched={touched}
        />
      )
    }

    if (key === 'identification_no') {
      return (
        <div className='d-flex flex-column'>
          <Component
            value={formData[key]}
            onChange={handleChangeData}
            name={key}
            classShared={className}
            insertRight={
              <Tippy offset={[40, 0]} content='Lookup Customer'>
                {/* Wrapper with a span tag to show tooltip */}
                <div className='supplement-input-advance search-icon d-flex align-items-center justify-content-center align-self-stretch border-0 border-left-1 rounded-left-0 bg-none px-4 cursor-pointer text-gray-600'>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </Tippy>
            }
          />

          <ErrorMessage shouldShowMessage={errors[key] && touched[key]} message={errors[key]} />
        </div>
      )
    }
    // End special cases

    // handle for select
    if (Component.name === 'Select') {
      return (
        <Component
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
          value={formData[key]}
          onChange={handleChangeData}
          name={key}
          classShared={className}
          options={options}
          dropDownGroup={item.dropDownGroup}
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
          checked={formData[key].includes(item.value)}
          value={item.value}
          onChange={handleChangeData}
        />
      ))
    }

    if (Component.name === 'Input' || Component.name === 'InputTime') {
      return (
        <Component
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
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
              'd-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 gap-lg-8',
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
        <Button loading={false} disabled={false} onClick={() => handleSubmit()}>
          Continue
        </Button>
      </div>
    </>
  )
}

export default GeneralInformation
