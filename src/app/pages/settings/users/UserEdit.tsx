import {FC, useEffect, useState} from 'react'
import Modal from '../../../components/modal/Modal'
import {UpdateById, UserInfo} from '../../../modules/auth'
import {useFormik} from 'formik'
import {swalToast} from '../../../swal-notification'
import {DEFAULT_MSG_ERROR} from '../../../constants/error-message'
import * as Yup from 'yup'
import {Input} from '../../../../components/inputs/input'
import request from '../../../axios'
import Select from '../../../../components/selects/select'

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
  branch_id: Yup.string().required('Branch is required.'),
  role_id: Yup.string().required('Role is required.'),
})

const UserEdit: FC<Props> = ({data, show, onClose, onRefreshListing}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<any>(data?.is_active || false)
  const [dataBranch, setDataBranch] = useState([])
  const [dataRole, setDataRole] = useState([])

  const {values, touched, errors, handleChange, handleSubmit, resetForm, setValues, setFieldValue} =
    useFormik<any>({
      initialValues: {
        ...data,
      },
      validationSchema: roleSchema,
      onSubmit: handleSubmitForm,
    })

  useEffect(() => {
    request
      .get('config/branch')
      .then(({data}) => {
        setDataBranch(data.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })

    request
      .get('config/role')
      .then(({data}) => {
        setDataRole(data.data)
      })
      .catch((error) => {
        console.error('Error: ', error?.message)
      })
    if (!data) return
    setValues(data)

    return () => resetForm()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmitForm(values: UserInfo) {
    const {user_id, ...payload} = values

    if (data) {
      onUpdateUser({id: user_id, data: payload})
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
      <form onSubmit={handleSubmit} className='flex-row-fluid p-1'>
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
        <Select
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

        <Select
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

        <Input
          title='First Name'
          id='firstname'
          error={errors.firstname}
          touched={touched.firstname}
          errorTitle={errors.firstname}
          value={values.firstname || ''}
          onChange={handleChange}
          required={true}
        />

        <Input
          title='Middle Name'
          id='middlename'
          error={errors.middlename}
          touched={touched.middlename}
          errorTitle={errors.middlename}
          value={values.middlename || ''}
          onChange={handleChange}
        />

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

        <Input
          title='Email'
          id='email'
          error={errors.email}
          touched={touched.email}
          errorTitle={errors.email}
          value={values.email || ''}
          onChange={handleChange}
        />

        <Input
          title='Telephone'
          id='telephone'
          error={errors.telephone}
          touched={touched.telephone}
          errorTitle={errors.telephone}
          value={values.telephone || ''}
          onChange={handleChange}
        />

        <div className='form-check form-switch form-switch-sm form-check-custom form-check-solid align-items-center'>
          <div style={{fontWeight: 500, fontSize: 16}}>Acive</div>
          <input
            className='form-check-input ms-4'
            style={{width: 50, height: 25}}
            type='checkbox'
            id='is_active'
            name='notifications'
            onChange={() => setIsActive(!isActive)}
            checked={isActive}
          />
        </div>

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

export default UserEdit
