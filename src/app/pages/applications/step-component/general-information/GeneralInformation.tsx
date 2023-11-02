import clsx from 'clsx'
import {FC, Fragment, useEffect, useMemo, useState} from 'react'
import * as Yup from 'yup'
import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {useFormik} from 'formik'
import ErrorMessage from '../../../../components/error/ErrorMessage'
import GeneralButton from '../GeneralButton'
import request from '../../../../axios'

const GeneralInformation: FC<PropsStepApplication> = ({
  formData,
  setFormData,
  config = [],
  changeStep,
  onGoToStep,
  setChangeStep,
}) => {
  const [datas, setdatas] = useState({})
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

  async function onFetchDataList() {
    try {
      const endpoint = config.filter((data) => !!data.dependencyApi)
      endpoint.map((d) => {
        request.post(d.dependencyApi || '', {status: true}).then((res) => {
          setdatas({...datas, [d.key]: res?.data?.data})
        })
      })
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    onFetchDataList()
  }, [])

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
    const {
      key,
      data = [],
      isFullLayout,
      column,
      options,
      keyLabelOfOptions,
      keyValueOfOptions,
      dependencyApi,
    } = item
    let Component: any = item?.component

    const className =
      isFullLayout || !column
        ? 'flex-grow-1 w-300px w-lg-unset'
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
          fieldValueOption={keyValueOfOptions}
          fieldLabelOption={keyLabelOfOptions}
          classShared={className}
          options={!!dependencyApi ? datas[key] || [] : options}
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
          checked={formData[key].includes(item.value.toString())}
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
      <GeneralButton handleSubmit={handleSubmit} />
    </>
  )
}

export default GeneralInformation
