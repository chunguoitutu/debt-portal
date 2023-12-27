import {FC, Fragment, useEffect, useMemo, useRef, useState} from 'react'
import clsx from 'clsx'
import Tippy from '@tippyjs/react'

import request from '../../../../app/axios'
import {BLOCK_ADDRESS_CONFIG} from '../config'
import {swalConfirm, swalToast} from '../../../../app/swal-notification'
import {Select} from '@/components/select'
import ErrorMessage from '@/components/error/ErrorMessage'
import {AddressTypeItem, ApplicationConfig, BlockAddress, PropsStepApplication} from '@/app/types'
import {DEFAULT_MESSAGE_ERROR_500} from '@/app/constants'
import {COUNTRY_PHONE_CODE, PROPERTY_TYPE} from '@/app/utils'
import {useParams} from 'react-router-dom'
import AddressGroup from './AddressGroup'

type BlockAddressCustom = {
  home: BlockAddress[]
  office: BlockAddress[]
  'work-site': BlockAddress[]
}

const ContactInformation: FC<PropsStepApplication> = ({config, formik, singpass}) => {
  const [dataOption, setDataOption] = useState<{[key: string]: any[]}>({})
  const errorContainerRef = useRef<HTMLDivElement | null>(null)
  const {values, touched, errors, handleChange, setValues, setFieldValue} = formik
  const [active, setActive] = useState<string | null>(null)

  const {applicationIdEdit} = useParams()

  useEffect(() => {
    onFetchDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blockAddressData = useMemo(() => {
    const data = values.address_contact_info.reduce(
      (acc: BlockAddressCustom, item: BlockAddress) => {
        return {
          ...acc,
          home: [...acc['home'], item],
        }
      },
      {
        home: [],
        office: [],
        'work-site': [],
      }
    )

    return data
  }, [values.address_contact_info])

  function handleChangeBlockAddress(e: React.ChangeEvent<any>, index: number, key: string) {
    const {value} = e.target

    setFieldValue(`address_contact_info[${index}][${key}]`, value)
  }

  async function onFetchDataList() {
    try {
      const updatedDataMarketing = {...dataOption}

      const endpoint = [...config, ...BLOCK_ADDRESS_CONFIG].filter((data) => !!data.dependencyApi)

      const requests = endpoint.map((d) =>
        request.post(d.dependencyApi || '', {status: true, pageSize: 99999, currentPage: 1})
      )

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const key = endpoint[index].key

        let data = [...res?.data?.data]

        // Move the first default item to the array[0]
        if (key === 'address_type_id') {
          const dataClone = [...data]
          const index = dataClone.findIndex((el) => el.is_default === 1)

          // Default data[0]
          let itemDefault = dataClone[0] || {}
          let isHomeAddress = itemDefault.address_type_name?.toLowerCase()?.includes('home')

          if (index !== -1) {
            itemDefault = dataClone.splice(index, 1)?.[0] || {}
            isHomeAddress = itemDefault.address_type_name?.toLowerCase()?.includes('home')

            data = [itemDefault, ...dataClone]
          }

          setActive(itemDefault?.address_type_name)

          // Only create and first mount component
          // !values.address_contact_info[0].address_type_id -> first mount
          if (!applicationIdEdit && !values.address_contact_info[0].address_type_id) {
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
              } // home_ownership, staying_condition: create fake spaces to avoid required

              delete newValue.housing_type
              delete newValue.existing_staying
              delete newValue.housing_type
            }
            !singpass &&
              setFieldValue(`address_contact_info[0]`, {
                ...newValue,
              })
          }
        }

        updatedDataMarketing[key] = data
      })

      setDataOption(updatedDataMarketing)

      // !applicationIdEdit &&
      //   setFieldValue(
      //     `address_contact_info[0][address_type_id]`,
      //     updatedDataMarketing?.address_type_id.length > 0
      //       ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1)
      //           .length > 0
      //         ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1)[0]
      //             .id
      //         : updatedDataMarketing?.address_type_id[0].id
      //       : ''
      //   )

      // setDefaultValueAddress(
      //   updatedDataMarketing?.address_type_id.length > 0
      //     ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1).length >
      //       0
      //       ? updatedDataMarketing?.address_type_id.filter((el: any) => +el.is_default === 1)[0].id
      //       : updatedDataMarketing?.address_type_id[0].id
      //     : ''
      // )
    } catch (error) {
    } finally {
    }
  }

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      column,
      options,
      keyLabelOfOptions,
      dependencyApi,
      keyValueOfOptions,
      typeInput,
      typeComponent,
    } = item
    let Component: any = item?.component

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
          name={key}
          classShared={className}
          options={!!dependencyApi ? dataOption[key] || [] : options}
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
            disabled={values.status === 3 || values.status === 2 ? true : false}
            name={key}
            classShared={className}
            type={typeInput === 'phone' ? 'number' : typeInput || 'text'}
            insertLeft={
              typeInput === 'phone' ? (
                <Tippy offset={[120, 0]} content='Please choose the phone number you prefer.'>
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

  function handleSwitchLabel(label) {
    switch (label) {
      case 'home':
        return 'Home Address'
      case 'office':
        return 'Office Address'
      case 'work-site':
        return 'Work Site Address'
      default:
        return 'Other'
    }
  }

  function handleShowConfirmDelete(item: BlockAddress, index: number) {
    if (!item.id) return handleRemoveBlockAddress(item, index)

    swalConfirm
      .fire({
        title: 'Are You Sure?',
        text: `You Won't Be Able To Revert This.`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleRemoveBlockAddress(item, index)
        }
      })
  }

  async function handleRemoveBlockAddress(item: BlockAddress, index: number) {
    try {
      item.id && (await request.delete(`/address/${item.id}`))
      setValues(
        {
          ...values,
          address_contact_info: values.address_contact_info.filter((_, i) => i !== index),
        },
        false
      )

      formik.setErrors({
        ...errors,
        address_contact_info: (errors?.address_contact_info as string[])?.filter(
          (_, i) => i !== index
        ),
      })
    } catch (error) {
      swalToast.fire({
        title: DEFAULT_MESSAGE_ERROR_500,
        icon: 'error',
      })
    }
  }

  function handleToggleAddress(newLabelActive: string) {
    setActive(active === newLabelActive ? null : newLabelActive)
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

      {dataOption?.address_type_id?.map((addressType: AddressTypeItem, i) => {
        // if (i > 0) return null
        return (
          <AddressGroup
            key={addressType.id}
            data={addressType}
            dataOption={dataOption}
            active={active}
            formik={formik}
            indexGroup={i}
            handleToggleActive={(dataAddressType) => {
              handleToggleAddress(dataAddressType.address_type_name)

              // const item = values.address_contact_info.find(
              //   (el) => el.address_type_id === dataAddressType.id
              // )

              // if (!item) {
              //   const isHomeAddress = dataAddressType.address_type_name
              //     ?.toLowerCase()
              //     ?.includes('home')

              //   setFieldValue(
              //     'address_contact_info',
              //     [
              //       ...values['address_contact_info'],
              //       {
              //         ...handleCreateBlockAddress(isHomeAddress),
              //         address_type_id: dataAddressType.id,
              //       } as BlockAddress,
              //     ],
              //     false
              //   )
              // }
            }}
          />
        )
      })}
    </>
  )
}

export default ContactInformation
