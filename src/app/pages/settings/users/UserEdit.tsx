import {FC, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {
  BranchItem,
  DataResponse,
  RoleInfo,
  UpdateById,
  UserInfo,
  useAuth,
} from '../../../modules/auth'
import {useFormik} from 'formik'
import {swalToast} from '../../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'
import * as Yup from 'yup'
import {Input} from '../../../components/inputs/input'
import request from '../../../axios'
import InputCheck from '../../../../components/inputs/inputCheck'
import Select from '../../../components/selects/select'
import {handleKeyPress, handlePaste} from '../../../components/enter-numbers-only'

type Props = {
  data?: UserInfo
  show: boolean
  onClose: () => void
  onRefreshListing: () => Promise<void>
}

export const roleSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is required.'),
  lastname: Yup.string().required('Last name is required.'),
  username: Yup.string().required('User name is required.'),
  password: Yup.string().required('Password is required.'),
  branch_id: Yup.string().required('Branch is required.'),
  role_id: Yup.string().required('Role is required.'),
  email: Yup.string().email("Email isn't valid").required('Email is required.'),
  telephone: Yup.string()
    .min(6, 'Minimum 6 symbols')
    .max(11, 'Maximum 11 symbols')
    .required('Telephone is required.'),
})

const initialValues = {
  firstname: '',
  middlename: '',
  lastname: '',
  username: '',
  password: '',
  branch_id: '',
  role_id: '',
  email: '',
  telephone: '',
}

const UserEdit: FC<Props> = ({data, show, onClose, onRefreshListing}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<any>(data ? data?.is_active : true)
  const [dataBranch, setDataBranch] = useState<BranchItem[]>([])
  const [dataRole, setDataRole] = useState<RoleInfo[]>([])

  const {priority, currentUser} = useAuth()

  const {values, touched, errors, handleChange, handleSubmit, resetForm, setValues, setFieldValue} =
    useFormik<any>({
      initialValues,
      validationSchema: roleSchema,
      onSubmit: handleSubmitForm,
    })

  useEffect(() => {
    if (!currentUser) return

    request
      .post<DataResponse<BranchItem[]>>('config/branch/listing')
      .then(({data}) => {
        setDataBranch(data.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })

    request
      .post<DataResponse<RoleInfo[]>>('config/role/listing')
      .then(({data}) => {
        let roleList = Array.isArray(data.data) ? [...data.data] : []

        if (priority === 2) {
          roleList = roleList.filter((role) => role.priority > 2)
        }
        setDataRole(roleList)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
    if (!data) return
    setValues(data)

    return () => resetForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  function handleSubmitForm(values: UserInfo) {
    const {user_id, ...payload} = values
    if (data) {
      onUpdateUser({id: user_id, data: {...payload, is_active: isActive ? 1 : 0}})
    } else {
      handleCreateUser(payload)
    }
  }

  async function handleCreateUser(payload: Omit<UserInfo, 'user_id'>) {
    setLoading(true)

    try {
      const mappingPayload = {
        ...payload,
        is_active: isActive ? 1 : 0,
        branch_id: +payload.branch_id,
        role_id: +payload.role_id,
      }
      const {data} = await request.post('config/loan_officer', mappingPayload)

      // handle after create successfully
      if (!data?.error) {
        await onRefreshListing()
        onClose()
        swalToast.fire({
          title: 'User successfully created!',
          icon: 'success',
        })
      } else {
        swalToast.fire({
          title: "Can't create user. Please try again!",
          icon: 'error',
        })
      }
    } catch (error: any) {
      const message = DEFAULT_MSG_ERROR

      swalToast.fire({
        title: message,
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  async function onUpdateUser(payload: UpdateById<Omit<UserInfo, 'user_id'>>) {
    // Pass if id = 0
    if (!payload.id) return

    setLoading(true)

    try {
      const {data} = await request.post('config/loan_officer/' + payload.id, payload.data)
      if (!data?.error) {
        await onRefreshListing()
        onClose()
        swalToast.fire({
          title: 'User successfully updated',
          icon: 'success',
        })
      } else {
        swalToast.fire({
          title: "Can't update user",
          icon: 'error',
        })
      }
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

  return (
    <Modal
      title={data ? `Edit User "${data.username}"` : 'Create New User'}
      show={show}
      onClose={onClose}
    >
      <div className='row'>
        <div className='col-4'>
          <Input
            title='First Name'
            id='firstname'
            error={errors.firstname}
            touched={touched.firstname}
            errorTitle={errors.firstname}
            value={values.firstname || ''}
            onChange={handleChange}
            required={true}
            name='firstname'
          />
        </div>

        <div className='col-4'>
          <Input
            title='Middle Name'
            id='middlename'
            error={errors.middlename}
            touched={touched.middlename}
            errorTitle={errors.middlename}
            value={values.middlename || ''}
            onChange={handleChange}
          />
        </div>

        <div className='col-4'>
          <Input
            title='Last Name'
            id='lastname'
            error={errors.lastname}
            touched={touched.lastname}
            errorTitle={errors.lastname}
            value={values.lastname || ''}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className='col-6'>
          <Input
            title='User Name'
            id='username'
            error={errors.username}
            touched={touched.username}
            errorTitle={errors.username}
            value={values.username || ''}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className='col-6'>
          <Input
            title='Password'
            id='password'
            error={errors.password}
            touched={touched.password}
            errorTitle={errors.password}
            value={values.password || ''}
            type='password'
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className='col-6'>
          <Select
            required
            datas={dataBranch}
            valueTitle='branch_name'
            setValueTitle='id'
            title='Branch'
            id='branch_id'
            errors={errors.branch_id}
            touched={touched.branch_id}
            errorTitle={errors.branch_id}
            value={values.branch_id}
            onChange={setFieldValue}
          />
        </div>

        <div className='col-6'>
          <Select
            required
            datas={dataRole}
            valueTitle='role_name'
            setValueTitle='id'
            title='Role'
            id='role_id'
            errors={errors.role_id}
            touched={touched.role_id}
            errorTitle={errors.role_id}
            value={values.role_id}
            onChange={setFieldValue}
          />
        </div>

        <div className='col-6'>
          <Input
            required
            title='Email'
            id='email'
            error={errors.email}
            touched={touched.email}
            errorTitle={errors.email}
            value={values.email || ''}
            onChange={handleChange}
          />
        </div>

        <div className='col-6'>
          <Input
            required
            title='Telephone'
            id='telephone'
            onPaste={handlePaste}
            onKeyPressCapture={handleKeyPress}
            error={errors.telephone}
            touched={touched.telephone}
            errorTitle={errors.telephone}
            value={values.telephone || ''}
            onChange={handleChange}
          />
        </div>

        <InputCheck
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          id='is_active'
          title='Active'
        />
      </div>

      <div className='d-flex flex-end pt-4'>
        <button type='button' className='btn btn-lg btn-primary' onClick={() => handleSubmit()}>
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
    </Modal>
  )
}

export default UserEdit
