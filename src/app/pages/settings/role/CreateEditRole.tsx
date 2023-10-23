import {FC, Fragment, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {RoleInfo, TableConfig, UpdateById, useAuth} from '../../../modules/auth'
import {useFormik} from 'formik'
import TextArea from '../../../components/textarea/TextArea'
import ErrorMessage from '../../../components/error/ErrorMessage'
import {createNewRole, updateRole} from '../../../modules/auth/core/_requests'
import {swalToast} from '../../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'
import * as Yup from 'yup'
import {Input} from '../../../components/inputs/input'
import {ROLE_PRIORITY} from '../../../utils/globalConfig'
import Select from '../../../components/selects/select'
import {PAGE_PERMISSION} from '../../../utils/pagePermission'

type Props = {
  data?: RoleInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
  config?: TableConfig
}

export const roleSchema = Yup.object().shape({
  role_name: Yup.string().required('Role name is required.'),
  priority: Yup.string().required('Priority is required.'),
})

const CreateEditRole: FC<Props> = ({data, show, config, onClose, onRefreshListing}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState<string[]>([])
  const [expanded, setExpanded] = useState<string[]>([])
  const [dataPermissionSetting, setDataPermissionSetting] = useState(PAGE_PERMISSION.setting)
  const {rows} = config || {}

  const {currentUser, priority} = useAuth()

  const {values, touched, errors, handleChange, handleSubmit, resetForm, setValues, setFieldValue} =
    useFormik<RoleInfo>({
      initialValues: {
        id: 0,
        role_name: '',
        description: '',
        permissions: '',
        priority: 0,
      },
      validationSchema: roleSchema,
      onSubmit: handleSubmitForm,
    })

  useEffect(() => {
    if (!data) return
    setValues(data)

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

    const permissions = setting.map((item) => {
      const isAccess = checked.find((itemCheck) => itemCheck === item.value) ? true : false

      const _newChild: any[] = []
      const {children} = item
      children?.forEach((ch) => {
        let _childrenItem = {...ch, value: ch.value.split('-')?.[0]}
        if (checked.includes(ch.value)) {
          _childrenItem = {..._childrenItem, active: true}
        }

        _newChild.push(_childrenItem)
      })
      return {
        ...item,
        isAccess,
        children: _newChild,
      }
    })

    return {..._PAGE_PERMISSION, setting: permissions}
  }

  async function onCreateNewRole(payload: Omit<RoleInfo, 'id'>) {
    setLoading(true)

    try {
      await createNewRole({...payload, company_id: currentUser?.company_id || 0})

      // handle after create successfully
      await onRefreshListing()
      onClose()
      swalToast.fire({
        title: 'Role successfully created',
        icon: 'success',
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  async function onUpdateRole(payload: UpdateById<Omit<RoleInfo, 'id'>>) {
    // Pass if id = 0
    if (!payload.id) return

    setLoading(true)

    try {
      await updateRole(payload)

      // handle after update successfully
      await onRefreshListing()
      onClose()
      swalToast.fire({
        title: 'Role successfully updated',
        icon: 'success',
      })
    } catch (error: any) {
      const message = error?.response?.data?.message || DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const DATA_ROLE_PRIORITY = ROLE_PRIORITY.filter((rolePriority) =>
    priority === 1
      ? Number(rolePriority.value) >= Number(priority)
      : Number(rolePriority.value) > Number(priority)
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

  return (
    <Modal
      title={data ? `Edit Role "${data.role_name}"` : 'Create New Role'}
      show={show}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        {(rows || [])
          .filter((item) => item.isCreateEdit)
          .map((item, index) => {
            const {informCreateEdit, key, name, component} = item
            const {type, typeInput, isRequired} = informCreateEdit || {}

            if (component) {
              const Component = component
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
              }

              return <Component key={index} data={ROLE_PRIORITY} />
            }

            if (type === 'input') {
              return (
                <Input
                  key={index}
                  title={name}
                  type={typeInput || 'text'}
                  id={key}
                  error={errors[key]}
                  touched={touched[key]}
                  errorTitle={errors[key]}
                  value={values[key] || ''}
                  onChange={handleChange}
                  required={isRequired}
                />
              )
            } else if (type === 'textarea') {
              return (
                <div className='mb-8' key={index}>
                  <TextArea
                    title={name}
                    name={key}
                    value={values[key] || ''}
                    onChange={handleChange}
                    isRequired={isRequired}
                  />

                  <ErrorMessage
                    className='mt-2'
                    shouldShowMessage={!!(errors[key] && touched[key])}
                    message={errors[key]}
                  />
                </div>
              )
            } else if (type === 'select') {
              if (key === 'priority')
                return (
                  <Select
                    key={index}
                    datas={DATA_ROLE_PRIORITY}
                    valueTitle='label'
                    setValueTitle='value'
                    required={true}
                    title='Priority'
                    id='priority'
                    errors={errors.priority}
                    touched={touched.priority}
                    errorTitle={errors.priority}
                    value={values.priority || ''}
                    onChange={setFieldValue}
                  />
                )

              return (
                <Select
                  key={index}
                  datas={DATA_ROLE_PRIORITY}
                  valueTitle='label'
                  setValueTitle='value'
                  required={isRequired}
                  title='Priority'
                  id='priority'
                  errors={errors.priority}
                  touched={touched.priority}
                  errorTitle={errors.priority}
                  value={values.priority || ''}
                  onChange={setFieldValue}
                />
              )
            } else {
              return <Fragment key={index}></Fragment>
            }
          })}

        <div className='d-flex flex-end'>
          <button type='submit' className='btn btn-lg btn-primary'>
            {loading ? (
              <>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </>
            ) : (
              <span>{data ? 'Update' : 'Create'}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateEditRole
