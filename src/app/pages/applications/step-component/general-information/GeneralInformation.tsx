import clsx from 'clsx'
import {FC, Fragment, useEffect, useState} from 'react'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {ApplicationConfig, PropsStepApplication} from '../../../../modules/auth'
import ErrorMessage from '../../../../components/error/ErrorMessage'
import request from '../../../../axios'
import LookupCustomer from './LookupCustomer'

const GeneralInformation: FC<PropsStepApplication> = (props) => {
  const {config = [], formik} = props

  const [dataMarketing, setDataMarketing] = useState({})
  const [showPopup, setShowPopup] = useState(false)

  const {values, touched, errors, handleChange} = formik

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
      ? 'flex-grow-1 w-300px w-lg-unset'
      : 'input-wrap flex-shrink-0 w-sm-300px w-xl-200px'

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
    if (typeComponent === 'Radio') {
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

    if (typeComponent === 'Input') {
      return (
        <div className='d-flex flex-column'>
          <Component
            value={values[key]}
            onChange={handleChange}
            type={typeInput}
            name={key}
            classShared={className}
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

          {errors[key] && touched[key] && <ErrorMessage message={errors[key] as string} />}
        </div>
      )
    }

    // unexpected
    return <Component />
  }

  return (
    <>
      {config.map((item, i) => {
        const {label, column, isHide, className, required} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <div
            className={clsx([
              'd-flex flex-column flex-lg-row align-items-start align-items-lg-stretch gap-3 gap-lg-8',
              !column ? 'full' : '',
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

      {showPopup && <LookupCustomer show={showPopup} onClose={() => setShowPopup(false)} />}
    </>
  )
}

export default GeneralInformation
