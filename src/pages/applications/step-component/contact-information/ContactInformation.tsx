import {FC, Fragment, useEffect, useMemo, useRef, useState} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'
import request from '../../../../app/axios'
import {BLOCK_ADDRESS_CONFIG} from '../config'
import {Select} from '@/components/select'
import ErrorMessage from '@/components/error/ErrorMessage'
import {AddressTypeItem, ApplicationConfig, BlockAddress, PropsStepApplication} from '@/app/types'
import {COUNTRY_PHONE_CODE, PROPERTY_TYPE, isFirstGetStepApplication} from '@/app/utils'
import {useParams} from 'react-router-dom'
import AddressGroup from './AddressGroup'
import {handleCreateBlockAddress} from '@/app/constants'
import {ApplicationStatus} from '@/app/types/enum'

type BlockAddressCustom = {
  home: BlockAddress[]
  office: BlockAddress[]
  'work-site': BlockAddress[]
}

const ContactInformation: FC<PropsStepApplication> = ({
  config,
  formik,
  optionListing,
  setOptionListing,
}) => {
  const errorContainerRef = useRef<HTMLDivElement | null>(null)
  const {values, touched, errors, handleChange, handleBlur, setValues, setFieldValue} = formik
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const isFirstGet = isFirstGetStepApplication({
      optionListing,
      config: [...config, ...BLOCK_ADDRESS_CONFIG],
    })
    const isHasLeast1Address = !!values?.address_contact_info?.[0]?.address_type_id

    if (isFirstGet || !isHasLeast1Address) {
      onFetchDataList()
    } else {
      // only handle when edit. show
      const {itemDefault} = handleSortAddressTypeListing(optionListing['address_type'])
      setActive(itemDefault.address_type_name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onFetchDataList() {
    try {
      const newOption: {[key: string]: any[]} = {}

      const endpoint = [...config, ...BLOCK_ADDRESS_CONFIG].filter((data) => !!data.dependencyApi)

      const requests = endpoint.map((d) =>
        request.post(d.dependencyApi || '', {status: true, pageSize: 99999, currentPage: 1})
      )

      if (!requests?.length) return

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const config = endpoint[index]

        let data = [...res?.data?.data]

        if (!Array.isArray(data) || !data?.length) return

        newOption[config.keyOfOptionFromApi || config.key] = data

        if (config.key === 'address_type_id') {
          const {newData, itemDefault, isHomeAddress} = handleSortAddressTypeListing(data)

          data = [...newData]
          setActive(itemDefault?.address_type_name)
          const isDraftOrCreate = [0, undefined].includes(values.status)
          const isHasLeast1Address = values.address_contact_info[0].address_type_id

          // Change first address block
          if (isDraftOrCreate && !isHasLeast1Address) {
            let newValue = {
              ...values.address_contact_info[0],
              address_type_id: itemDefault.id,
            } as BlockAddress

            if (isHomeAddress) {
              newValue = {
                ...newValue,
                property_type: PROPERTY_TYPE[0].value as string,
                housing_type: '',
                home_ownership: '',
                staying_condition: '',
                existing_staying: 0,
              }

              delete newValue.is_default
            } else {
              newValue = {
                ...newValue,
                is_default: 0,
                home_ownership: ' ',
                staying_condition: ' ',
                housing_type: ' ',
              } // home_ownership, staying_condition: create fake spaces to avoid formik required

              delete newValue.existing_staying
            }

            setFieldValue(`address_contact_info[0]`, newValue)
          }
        }
      })

      setOptionListing((prev) => ({...prev, ...newOption}))
    } catch (error) {
    } finally {
    }
  }

  /**
   * Put the address containing "home" character at the beginning of the array
   */
  function handleSortAddressTypeListing(data: AddressTypeItem[]) {
    let newData = [...data]

    const dataClone = [...data] as AddressTypeItem[]
    const indexHomeAddress = dataClone.findIndex((el) =>
      el.address_type_name.toLowerCase()?.includes('home')
    ) // filter address type home

    let itemDefault = dataClone[0]
    let isHomeAddress = indexHomeAddress === -1 ? false : true

    itemDefault =
      dataClone.splice(indexHomeAddress === -1 ? 0 : indexHomeAddress, 1)?.[0] ||
      ({} as AddressTypeItem)
    newData = [itemDefault, ...dataClone]

    return {
      itemDefault,
      newData: newData,
      isHomeAddress,
    }
  }

  function handleToggleAddress(newLabelActive: string) {
    setActive(active === newLabelActive ? null : newLabelActive)
  }

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      keyOfOptionFromApi,
      column,
      options,
      keyLabelOfOptions,
      dependencyApi,
      keyValueOfOptions,
      typeInput,
      typeComponent,
    } = item
    let Component: any = item?.component

    const isDisableApproveOrReject = [
      ApplicationStatus.APPROVED,
      ApplicationStatus.REJECTED,
    ].includes(values.status)

    // nothing
    if (!Component) return

    const className = !column
      ? 'flex-grow-1'
      : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-250px'

    useEffect(() => {
      if (errors[key] && touched[key]) {
        errorContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }, [errors[key], touched[key]])

    if (typeComponent === 'Select') {
      return (
        <Component
          value={values[key]}
          onChange={handleChange}
          onBlur={handleBlur}
          name={key}
          classShared={className}
          options={!!dependencyApi ? optionListing[keyOfOptionFromApi || key] || [] : options}
          error={errors[key]}
          touched={touched[key]}
          keyValueOption={keyValueOfOptions}
          keyLabelOption={keyLabelOfOptions}
        />
      )
    }

    if (typeComponent === 'Input') {
      return (
        <div className='d-flex flex-column w-100'>
          <Component
            value={values[key]}
            onChange={handleChange}
            disabled={isDisableApproveOrReject}
            onBlur={handleBlur}
            name={key}
            classShared={className}
            type={typeInput === 'phone' ? 'number' : typeInput || 'text'}
            insertLeft={
              typeInput === 'phone' ? (
                <Tippy
                  offset={[120, 0]}
                  content='Please choose the phone number you prefer.'
                  disabled={isDisableApproveOrReject}
                >
                  {/* Wrapper with a span tag to show tooltip */}
                  <span>
                    <Select
                      onChange={handleChange}
                      value={values[key]}
                      isOptionDefault={false}
                      classShared='m-0'
                      className='supplement-input-advance border-0 border-right-1 rounded-right-0 bg-none px-4 w-fit-content mw-65px text-truncate text-align-last-center'
                      name='country_phone_code'
                      options={COUNTRY_PHONE_CODE}
                      disabled
                    />
                  </span>
                </Tippy>
              ) : undefined
            }
          />

          {errors[key] && touched[key] && (
            <ErrorMessage message={errors[key]} containerRef={errorContainerRef} />
          )}
        </div>
      )
    }

    // unexpected
    return <Component />
  }

  return (
    <>
      {config?.map((item, i) => {
        const {label, column, isHide, required, className} = item

        if (isHide) return <Fragment key={i}></Fragment>

        return (
          <Fragment key={i}>
            <div
              className={clsx([
                'd-flex flex-column flex-xxl-row align-items-start align-items-xxl-stretch gap-3 gap-xxl-8',
                !column ? 'full' : '',
                className,
              ])}
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
          </Fragment>
        )
      })}

      {optionListing?.address_type?.map((addressType: AddressTypeItem, i) => {
        return (
          <AddressGroup
            key={addressType.id}
            data={addressType}
            dataOption={optionListing}
            active={active}
            formik={formik}
            indexGroup={i}
            handleToggleActive={(dataAddressType) => {
              handleToggleAddress(dataAddressType.address_type_name)

              const item = values.address_contact_info.find(
                (el) => el.address_type_id === dataAddressType.id
              )

              const isShow = dataAddressType.address_type_name === active ? false : true

              if (
                !item &&
                ![ApplicationStatus.APPROVED, ApplicationStatus.REJECTED].includes(
                  values.status || 0
                ) &&
                isShow
              ) {
                const isHomeAddress = dataAddressType.address_type_name
                  ?.toLowerCase()
                  ?.includes('home')

                setFieldValue(
                  'address_contact_info',
                  [
                    ...values['address_contact_info'],
                    {
                      ...handleCreateBlockAddress(isHomeAddress),
                      address_type_id: dataAddressType.id,
                    } as BlockAddress,
                  ],
                  false
                )
              }
            }}
          />
        )
      })}
    </>
  )
}

export default ContactInformation
