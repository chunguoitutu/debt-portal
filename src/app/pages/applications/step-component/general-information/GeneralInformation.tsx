import clsx from 'clsx'
import {FC, Fragment, useEffect, useState} from 'react'
import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import ErrorMessage from '../../../../components/error/ErrorMessage'
import request from '../../../../axios'

const GeneralInformation: FC<PropsStepApplication> = (props) => {
  const {config = [], formik} = props

  const [dataMarketing, setDataMarketing] = useState({})

  const {values, touched, errors, handleChange} = formik

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onFetchDataList() {
    try {
      const endpoint = config.filter((data) => !!data.dependencyApi)
      endpoint.forEach((d) => {
        request.post(d.dependencyApi || '', {status: true}).then((res) => {
          setDataMarketing({...dataMarketing, [d.key]: res?.data?.data})
        })
      })
    } catch (error) {
    } finally {
    }
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
      return <Component {...props} />
    }

    if (key === 'identification_no') {
      return (
        <div className='d-flex flex-column'>
          <Component
            value={values[key]}
            onChange={handleChange}
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

          <ErrorMessage shouldShowMessage={!!errors[key] && !!touched[key]} message={errors[key]} />
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
          value={values[key]}
          onChange={handleChange}
          name={key}
          fieldValueOption={keyValueOfOptions}
          fieldLabelOption={keyLabelOfOptions}
          classShared={className}
          options={!!dependencyApi ? dataMarketing[key] || [] : options}
          dropDownGroup={item.dropDownGroup}
        />
      )
    }

    // handle for radio
    if (Component.name === 'Radio') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([values[key] === item.value ? 'text-gray-800' : 'text-gray-600'])}
          name={key}
          label={item.label}
          checked={values[key] === item.value}
          value={item.value}
          onChange={handleChange}
        />
      ))
    }

    if (Component.name === 'Input' || Component.name === 'InputTime') {
      return (
        <Component
          error={errors[key]}
          touched={touched[key]}
          errorTitle={errors[key]}
          value={values[key]}
          onChange={handleChange}
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
    </>
  )
}

export default GeneralInformation
