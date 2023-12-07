import clsx from 'clsx'
import {FC, Fragment, useEffect, useState} from 'react'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import ErrorMessage from '@/components/error/ErrorMessage'
import LookupCustomer from './LookupCustomer'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'
import request from '@/app/axios'
import {getCurrentDate} from '@/app/utils/get-current-date'

const GeneralInformation: FC<PropsStepApplication> = (props) => {
  const {config = [], formik} = props

  const [dataMarketing, setDataMarketing] = useState({})
  const [showPopup, setShowPopup] = useState(false)

  const {values, touched, errors, handleChange, handleBlur} = formik

  async function onFetchDataList() {
    try {
      const updatedDataMarketing = {...dataMarketing}
      const endpoint = config.filter((data) => !!data.dependencyApi)

      const requests = endpoint.map((d) =>
        request.post(d.dependencyApi || '', {status: true, pageSize: 99999, currentPage: 1})
      )

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const key = endpoint[index].key
        updatedDataMarketing[key] = res?.data?.data
      })

      setDataMarketing(updatedDataMarketing)
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleShowPopup() {
    setShowPopup(!showPopup)
  }

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      data = [],
      column,
      options,
      keyLabelOfOptions,
      keyValueOfOptions,
      dependencyApi,
      typeInput,
      typeComponent,
    } = item

    let Component: any = item?.component

    const className = !column
      ? 'flex-grow-1'
      : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-200px'

    // nothing
    if (!Component) return

    // Special cases should be checked in advance
    if (key === 'firstname') {
      return <Component {...props} />
    }
    // End special cases

    // handle for select
    if (typeComponent === 'Select') {
      return (
        <Component
          error={errors[key]}
          touched={touched[key]}
          value={values[key]}
          onChange={handleChange}
          name={key}
          keyValueOption={keyValueOfOptions}
          keyLabelOption={keyLabelOfOptions}
          classShared={className}
          options={!!dependencyApi ? dataMarketing[key] || [] : options}
          dropDownGroup={item.dropDownGroup}
        />
      )
    }

    // handle for radio
    if (typeComponent === 'Radio') {
      return data.map((item, i) => (
        <Component
          key={i}
          classNameLabel={clsx([
            values[key] === item.value ? 'fs-4 fw-medium' : 'text-gray-600 fs-4 fw-medium',
          ])}
          name={key}
          label={item.label}
          checked={values[key] === item.value}
          value={item.value}
          onChange={handleChange}
        />
      ))
    }

    if (typeComponent === 'Input') {
      return (
        <>
          <Component
            value={values[key]}
            onChange={handleChange}
            onBlur={handleBlur}
            type={typeInput}
            name={key}
            classShared={className}
            touched={touched[key]}
            error={errors[key]}
            min='1900-01-01'
            max={getCurrentDate()}
            insertRight={
              key === 'identification_no' ? (
                <Tippy offset={[40, 0]} content='Lookup Customer'>
                  {/* Wrapper with a span tag to show tooltip */}
                  <div
                    className='supplement-input-advance search-icon d-flex align-items-center justify-content-center align-self-stretch border-0 border-left-1 rounded-left-0 bg-none px-4 cursor-pointer text-gray-600'
                    onClick={handleShowPopup}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </Tippy>
              ) : undefined
            }
          />
        </>
      )
    }

    // unexpected
    return <Component />
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, column, isHide, className, required, typeComponent} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex gap-3 gap-xxl-8',
              !column ? 'full' : '',
              typeComponent === 'Radio'
                ? 'align-items-center gap-5'
                : 'flex-column flex-xxl-row align-items-start align-items-xxl-stretch',
              className,
            ])}
            key={i}
          >
            <div
              className={clsx([
                'input-title-application left fs-4 text-start text-lg-end',
                required && 'required',
                typeComponent === 'Radio' && 'd-none d-xxl-block',
              ])}
            >
              {label}
            </div>

            {renderComponent(item)}
          </div>
        )
      })}

      {showPopup && <LookupCustomer show={showPopup} onClose={() => setShowPopup(false)} />}
    </>
  )
}

export default GeneralInformation
