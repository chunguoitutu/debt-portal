import {ChangeEvent, FC, Fragment, useEffect, useState} from 'react'
import {useFormik} from 'formik'

import {RoleInfo, TableConfig, UpdateById} from '@/app/types'
import {PAGE_PERMISSION} from '@/app/utils'
import {useAuth} from '@/app/context/AuthContext'
import {convertErrorMessageResponse, isJson} from '@/app/utils'
import {createNewRole, updateRole} from '@/app/axios/request'
import {swalToast} from '@/app/swal-notification'
import {ROLE_PRIORITY} from '@/app/utils'
import Modal from '@/components/modal/Modal'
import {Input} from '@/components/input'
import {TextArea} from '@/components/textarea'
import Button from '@/components/button/Button'

type Props = {
  data?: RoleInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
  config?: TableConfig
}

const CreateEditRole: FC<Props> = ({data, show, config, onClose, onRefreshListing}) => {
  const [checked, setChecked] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string[]>([])
  const [dataPermissionSetting, setDataPermissionSetting] = useState(PAGE_PERMISSION.setting)
  const {rows, settings} = config || {}
  const {validationCreateEdit} = settings || {}

  const {company_id, priority} = useAuth()

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setFieldValue,
    setSubmitting,
  } = useFormik<RoleInfo>({
    initialValues: {
      id: 0,
      role_name: '',
      description: '',
      permissions: '',
      status: 1,
      priority: 0,
    },
    validationSchema: validationCreateEdit,
    onSubmit: handleSubmitForm,
  })

  useEffect(() => {
    if (!data) return
    setValues(data)

    // handle edit permissions
    if (!data?.permissions || !isJson(data?.permissions)) return
    const nodes = JSON.parse(data?.permissions)
    const {setting} = nodes || {}

    if (Array.isArray(setting) && setting.length) {
      const checked: any[] = []

      // handle find list checked
      setting.forEach((item) => {
        const {isAccess, children = [], label, value} = item
        if (isAccess) {
          const valueChildrenChecked = children
            .filter((ch: any) => ch.active)
            .map((item: any) => `${item.value}-${label}`)

          checked.push(...valueChildrenChecked, value)
        }
      })
      setChecked(checked)
    }

    // Reset form data when component unmounted
    return () => resetForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //HANDLE ADD PERMISSION DROPDOWN
  useEffect(() => {
    let tmpChecked: Array<any> = []
    if (data && data.permissions) {
      const permission = JSON.parse(data.permissions)
      const mapping = Object.entries(permission).reduce((a, [key, values]) => {
        if (Array.isArray(values)) {
          const child = values.map((el: any) => {
            if (el.isAccess) {
              tmpChecked = [...tmpChecked, el.value]
            }
            return {
              ...el,
              children: (el.children || []).map((ele) => {
                if (ele.active) {
                  tmpChecked = [...tmpChecked, `${ele.value}-${el.label}`]
                }
                return {
                  ...ele,
                  value: `${ele.value}-${el.label}`,
                }
              }),
            }
          })
          return (a[key] = child)
        }
        return a
      }, {})

      setChecked(tmpChecked)
      setDataPermissionSetting(mapping['setting'])
    }
  }, [data])

  function handleSubmitForm(values: RoleInfo) {
    const {id, ...payload} = values

    const permissions = onGetPermissions()

    if (data) {
      onUpdateRole({
        id,
        data: {
          ...payload,
          priority: Number(payload.priority),
          permissions: JSON.stringify(permissions),
        },
      })
    } else {
      onCreateNewRole({
        ...payload,
        priority: Number(payload.priority),
        permissions: JSON.stringify(permissions),
      })
    }
  }

  function onGetPermissions() {
    const _PAGE_PERMISSION = {...PAGE_PERMISSION}
    const {setting} = _PAGE_PERMISSION

    const permissions = setting.map((item: any) => {
      const isAccess = checked.find((itemCheck) => itemCheck === item.value) ? true : false

      const newChild: any[] = []
      const {children} = item
      children?.forEach((ch) => {
        let _childrenItem = {...ch, value: ch.value.split('-')?.[0]}
        if (checked.includes(ch.value)) {
          _childrenItem = {..._childrenItem, active: true}
        }

        newChild.push(_childrenItem)
      })
      return {
        ...item,
        isAccess,
        children: newChild,
      }
    })

    return {..._PAGE_PERMISSION, setting: permissions}
  }

  async function onCreateNewRole(payload: Omit<RoleInfo, 'id'>) {
    try {
      await createNewRole({...payload, company_id: +company_id || 0})

      // handle after create successfully
      await onRefreshListing()
      const role_name = values.role_name
      onClose()
      swalToast.fire({
        title: `Role "${role_name}" successfully created`,
        icon: 'success',
      })
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)
      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function onUpdateRole(payload: UpdateById<Omit<RoleInfo, 'id'>>) {
    // Pass if id = 0
    if (!payload.id) return

    try {
      const response = await updateRole(payload)

      // handle after update successfully
      await onRefreshListing()
      const role_name = values.role_name
      onClose()
      swalToast.fire({
        title: `Role "${role_name}" successfully updated`,
        icon: 'success',
      })
    } catch (error: any) {
      const message = convertErrorMessageResponse(error)
      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const DATA_ROLE_PRIORITY = ROLE_PRIORITY.filter(
    (rolePriority) => Number(rolePriority.value) > Number(priority)
  )

  function handleCheck(_: string[], node: any) {
    const {checked: isChecked, value = '', children = [], parent} = node

    // Add "-" to avoid duplicate with address
    if (
      value.startsWith('view-') ||
      value.startsWith('add-') ||
      value.startsWith('edit-') ||
      value.startsWith('delete-')
    ) {
      // Get list children of parent
      const valueChildren = parent?.children?.map((item: any) => item.value) || []

      let newList = isChecked
        ? Array.from(new Set([...checked, parent.value, value]))
        : checked.filter((item: any) => item !== value)

      // If all children not check will not check parent
      if (!isChecked) {
        newList = valueChildren.every((item: any) => !newList.includes(item))
          ? newList.filter((item) => item !== parent.value)
          : newList
      }

      setChecked(newList)
    } else {
      const valueChildrenList = children.map((item: any) => item.value)

      const newList = isChecked
        ? Array.from(new Set([...checked, value, ...valueChildrenList]))
        : checked.filter((item: any) => ![value, ...valueChildrenList].includes(item))
      setChecked(newList)
    }
  }

  function handleExpand(e: string[]) {
    setExpanded(e)
  }

  function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
    setFieldValue('status', e.target.checked ? 1 : 0)
  }

  return (
    <Modal
      title={data ? `Edit Role "${data.role_name}"` : 'New Role'}
      show={show}
      onClose={onClose}
      dialogClassName='mw-800px'
    >
      <form className='py-30px ps-30px pe-30px'>
        {(rows || [])
          .filter((item) => item.infoCreateEdit)
          .map((item, index) => {
            const {infoCreateEdit, key, name, component} = item
            const {
              type,
              typeInput,
              isRequired,
              component: componentCreateEdit,
            } = infoCreateEdit || {}

            if (component || componentCreateEdit) {
              const Component = componentCreateEdit || component

              if (key === 'permissions') {
                return (
                  <Component
                    key={index}
                    title={name}
                    id={key}
                    checked={checked}
                    expanded={expanded}
                    onCheck={handleCheck}
                    onExpand={handleExpand}
                    isEdit={true}
                    data={dataPermissionSetting}
                  />
                )
              } else if (key === 'priority') {
                return (
                  <Component
                    name={key}
                    key={index}
                    options={DATA_ROLE_PRIORITY}
                    keyLabelOption='label'
                    keyValueOption='value'
                    required={isRequired}
                    label='Priority'
                    id='priority'
                    error={errors[key]}
                    touched={touched[key]}
                    value={values.priority || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )
              } else if (key === 'status') {
                return (
                  <Component
                    checked={!!values.status}
                    onChange={handleChangeStatus}
                    id='status'
                    label='Status'
                    key={index}
                  />
                )
              } else {
                return <Component key={index} data={ROLE_PRIORITY} />
              }
            }

            if (type === 'input') {
              return (
                <div className='d-flex flex-column mb-16px' key={index}>
                  <Input
                    label={name}
                    type={typeInput || 'text'}
                    name={key}
                    value={values[key] || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={isRequired}
                    error={errors[key]}
                    touched={touched[key]}
                  />
                </div>
              )
            } else if (type === 'textarea') {
              return (
                <div className='mb-16px' key={index}>
                  <TextArea
                    label={name}
                    name={key}
                    value={values[key] || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={isRequired}
                    error={errors[key]}
                    touched={touched[key]}
                  />
                </div>
              )
            } else {
              return <Fragment key={index}></Fragment>
            }
          })}
      </form>
      <div className='d-flex flex-end py-30px ps-30px pe-30px border-top border-gray-200'>
        <Button
          type='reset'
          onClick={() => onClose()}
          className='btn-lg btn-secondary align-self-center me-8px fs-6'
        >
          Cancel
        </Button>
        <Button
          className='btn-lg btn-primary fs-6'
          type='submit'
          onClick={() => handleSubmit()}
          loading={isSubmitting}
        >
          {data ? 'Update' : 'Create'}
        </Button>
      </div>
    </Modal>
  )
}

export default CreateEditRole
