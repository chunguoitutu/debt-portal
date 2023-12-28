import {AddressTypeItem, ApplicationFormData, BlockAddress} from '@/app/types'
import {
  HOME_OWNERSHIP,
  HOUSING_HDB_TYPE,
  HOUSING_PRIVATE_RESIDENTIAL,
  PROPERTY_TYPE,
  STAYING_CONDITION,
  YES_NO_OPTION,
} from '@/app/utils'
import {CheckboxRounded} from '@/components/checkbox'
import Radio from '@/components/radio/Radio'
import {Select} from '@/components/select'
import clsx from 'clsx'
import {FormikProps} from 'formik'
import {ChangeEvent, FC, Fragment, useMemo} from 'react'
import {BLOCK_ADDRESS_CONFIG} from '../config'
import Button from '@/components/button/Button'
import {DEFAULT_MESSAGE_ERROR_500, handleCreateBlockAddress} from '@/app/constants'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose, faWarning} from '@fortawesome/free-solid-svg-icons'
import request from '@/app/axios'
import {swalConfirm, swalToast} from '@/app/swal-notification'
import {useParams} from 'react-router-dom'

type Props = {
  data: AddressTypeItem
  active: string | null
  handleToggleActive: (newActiveLabel: AddressTypeItem) => void
  formik: FormikProps<ApplicationFormData>
  dataOption?: {[key: string]: any[]}
  indexGroup: number
}

const AddressGroup: FC<Props> = ({
  data: dataAddressType,
  dataOption,
  active,
  formik,
  handleToggleActive,
  indexGroup,
}) => {
  const {id: addressGroupId, address_type_name} = dataAddressType
  const {values, errors, touched, setFieldValue, setValues} = formik

  const {applicationIdEdit} = useParams()

  const isGroupError = useMemo(() => {
    if (active === address_type_name || !errors.address_contact_info) return false

    const indexListBelongGroup: number[] = values.address_contact_info
      .map((el, i) => (el.address_type_id === addressGroupId ? i : undefined))
      .filter((el) => !!el || typeof el === 'number') as number[]

    const isError = indexListBelongGroup.some((index) => errors.address_contact_info?.[index])

    return isError
  }, [errors.address_contact_info, active])

  const qtyAddressAdded = useMemo(() => {
    return values.address_contact_info.filter((el) => el.address_type_id === addressGroupId).length
  }, [active, values.address_contact_info])

  function handleChangeCustom(e: ChangeEvent<any>, index: number) {
    const {type, checked, value, name} = e.target

    const field = `address_contact_info[${index}][${name}]`
    setFieldValue(field, type === 'checkbox' ? +checked : value)

    if (name === 'property_type') {
      setFieldValue(`address_contact_info[${index}]["housing_type"]`, '')
    }
  }

  function handleAddBlock() {
    if (!!applicationIdEdit && [2, 3].includes(values.status || 0)) return

    const isHomeAddress = address_type_name?.toLowerCase()?.includes('home')

    setFieldValue(
      'address_contact_info',
      [
        ...values['address_contact_info'],
        {
          ...handleCreateBlockAddress(isHomeAddress),
          address_type_id: addressGroupId,
        } as BlockAddress,
      ],
      false
    )
  }

  function renderButtonAddressNew() {
    return (
      <div className='d-flex align-items-center justify-content-end gap-16px'>
        <Button
          className='btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary w-fit-content'
          onClick={handleAddBlock}
          disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
        >
          + Add New Block
        </Button>
      </div>
    )
  }

  function handleShowConfirmDelete(item: BlockAddress, index: number) {
    if (!!applicationIdEdit && [2, 3].includes(values.status || 0)) return

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

  return (
    <div className='full'>
      {/* header */}
      <div className='separator-contact full'></div>

      <h3
        className='pt-24px fs-20 fw-bold d-flex align-items-center gap-8px cursor-pointer m-0'
        onClick={() => handleToggleActive(dataAddressType)}
      >
        {active === address_type_name ? (
          <i className='ki-duotone ki-minus-square toggle-on text-primary fs-1'>
            <span className='path1'></span>
            <span className='path2'></span>
          </i>
        ) : (
          <i className='ki-duotone ki-plus-square toggle-off fs-1'>
            <span className='path1'></span>
            <span className='path2'></span>
            <span className='path3'></span>
          </i>
        )}

        {address_type_name}

        {active !== address_type_name && qtyAddressAdded > 0 && (
          <span className='text-gray-600 fs-14 fw-semibold'>
            ({qtyAddressAdded} addresses has been added)
          </span>
        )}

        {isGroupError && <FontAwesomeIcon className='fs-20px text-danger' icon={faWarning} />}
      </h3>

      <>
        {/* d-none for validation while hidden */}
        <div className={`mt-24px ${active === address_type_name ? '' : 'd-none'}`}>
          {/* Address control */}
          {values['address_contact_info'].map((address, index, originArray) => {
            const {
              address_type_id,
              existing_staying,
              housing_type,
              is_default,
              home_ownership,
              staying_condition,
              property_type,
            } = address

            const isHomeAddress = address_type_name?.toLowerCase()?.includes('home')
            const isBelongGroup = address_type_id === addressGroupId

            const times =
              originArray.filter((el, i) => el.address_type_id === addressGroupId && i < index)
                .length + 1
            const isLast =
              originArray.filter((el) => el.address_type_id === addressGroupId).length === times

            if (!isBelongGroup) return null

            return (
              <Fragment key={index}>
                <div
                  className={clsx([
                    'card gx-0 border border-gray-300 overflow-hidden mb-24px rounded-12',
                    times > 1 && 'mt-24px',
                  ])}
                >
                  <div className='py-16px px-24px d-flex align-items-center justify-content-between gap-24px bg-gray-100 border-bottom border-gray-300'>
                    <h3 className='fw-bold fs-16 m-0'>
                      {address_type_name} {times}
                    </h3>

                    {!(indexGroup === 0 && times === 1) && (
                      <FontAwesomeIcon
                        className='fs-20 text-gray-900 text-hover-danger cursor-pointer'
                        icon={faClose}
                        onClick={() => handleShowConfirmDelete(address, index)}
                      />
                    )}
                  </div>

                  <div className='row p-24px pt-16px gy-12px gx-30px'>
                    {!isHomeAddress && (
                      <div className='col-12'>
                        <CheckboxRounded
                          disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
                          name={isHomeAddress ? 'existing_staying' : 'is_default'}
                          label={
                            isHomeAddress ? 'Existing Staying' : `Default ${address_type_name}`
                          }
                          request_info
                          checked={isHomeAddress ? !!existing_staying : !!is_default}
                          onChange={(e) => handleChangeCustom(e, index)}
                        />
                      </div>
                    )}
                    {isHomeAddress && (
                      <>
                        <div className='col-6'>
                          <Select
                            disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
                            label='Property Type'
                            classShared='m-0 flex-grow-1'
                            name={'property_type'}
                            options={PROPERTY_TYPE}
                            value={property_type}
                            isOptionDefault={false}
                            onChange={(e: any) => handleChangeCustom(e, index)}
                            error={errors['address_contact_info']?.[index]?.['property_type']}
                            touched={touched['address_contact_info']?.[index]?.['property_type']}
                          />
                        </div>

                        <div className='col-6'>
                          <Select
                            disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
                            label='Housing Type'
                            classShared='m-0 flex-grow-1'
                            name={'housing_type'}
                            options={
                              property_type === 'HDB'
                                ? HOUSING_HDB_TYPE
                                : HOUSING_PRIVATE_RESIDENTIAL
                            }
                            value={housing_type}
                            required={true}
                            onChange={(e: any) => handleChangeCustom(e, index)}
                            error={errors['address_contact_info']?.[index]?.['housing_type']}
                            touched={touched['address_contact_info']?.[index]?.['housing_type']}
                          />
                        </div>

                        <div className='col-4'>
                          <Select
                            disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
                            label='Existing Staying'
                            classShared='m-0 flex-grow-1'
                            name={'existing_staying'}
                            options={YES_NO_OPTION.map((item) => ({...item, value: +item.value}))}
                            value={existing_staying}
                            isOptionDefault={false}
                            onChange={(e: any) => handleChangeCustom(e, index)}
                          />
                        </div>

                        <div className='col-4'>
                          <Select
                            disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
                            value={home_ownership || ''}
                            onChange={(e: any) => handleChangeCustom(e, index)}
                            required={true}
                            label='Home Ownership'
                            classShared='m-0 flex-grow-1'
                            name='home_ownership'
                            options={HOME_OWNERSHIP}
                            keyValueOption={'label'}
                            keyLabelOption={'value'}
                            error={errors['address_contact_info']?.[index]?.['home_ownership']}
                            touched={touched['address_contact_info']?.[index]?.['home_ownership']}
                          />
                        </div>

                        <div className='col-4'>
                          <Select
                            disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
                            value={staying_condition || ''}
                            onChange={(e: any) => handleChangeCustom(e, index)}
                            required={true}
                            label='Staying Condition'
                            classShared='m-0 flex-grow-1'
                            name={'staying_condition'}
                            options={STAYING_CONDITION}
                            keyValueOption={'label'}
                            keyLabelOption={'value'}
                            error={errors['address_contact_info']?.[index]?.['staying_condition']}
                            touched={
                              touched['address_contact_info']?.[index]?.['staying_condition']
                            }
                          />
                        </div>

                        {/* Separator */}
                        <div className='col-12'>
                          <div className='border-bottom border-gray-200 my-8px' />
                        </div>
                      </>
                    )}

                    {BLOCK_ADDRESS_CONFIG.map((item) => {
                      const {
                        key,
                        column = 12,
                        component,
                        typeComponent,
                        label,
                        keyLabelOfOptions,
                        keyValueOfOptions,
                        options,
                        required,
                      } = item

                      const Comp = component

                      if (
                        !Comp ||
                        ['home_ownership', 'staying_condition', 'housing_type'].includes(key)
                      )
                        return null

                      let props: any = {}

                      if (typeComponent === 'Select') {
                        props = {
                          options: dataOption?.[key] || options || [],
                          keyValueOption: keyValueOfOptions || 'label',
                          keyLabelOption: keyLabelOfOptions || 'value',
                        }
                      }

                      return (
                        <div className={`col-${column}`} key={key}>
                          <Comp
                            disabled={!!applicationIdEdit && [2, 3].includes(values.status || 0)}
                            required={required}
                            label={label}
                            classShared='m-0 flex-grow-1'
                            name={key}
                            value={address[key] || ''}
                            onChange={(e: any) => handleChangeCustom(e, index)}
                            error={errors['address_contact_info']?.[index]?.[key]}
                            touched={touched['address_contact_info']?.[index]?.[key]}
                            {...props}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
                {isLast && renderButtonAddressNew()}
              </Fragment>
            )
          })}
        </div>
      </>

      {active === address_type_name &&
        !values.address_contact_info.find((el) => el.address_type_id === addressGroupId) &&
        renderButtonAddressNew()}
    </div>
  )
}

export default AddressGroup
