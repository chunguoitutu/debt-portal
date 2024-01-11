import request from '@/app/axios'
import {useAuth} from '@/app/context/AuthContext'
import {swalToast} from '@/app/swal-notification'
import {DataResponse, LoanAssignment, LoanDetailsProps, UserInfo} from '@/app/types'
import {convertMessageErrorRequired, getFullName} from '@/app/utils'
import Button from '@/components/button/Button'
import {Select} from '@/components/select'
import {useFormik} from 'formik'
import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {DEFAULT_MSG_ERROR} from '@/app/constants'

const schema = Yup.object().shape({
  officer_id: Yup.string().required(convertMessageErrorRequired()),
})

const LoanAssignmentAndActionLog: FC<LoanDetailsProps> = ({loanInfo: dataInfo, setLoanInfo}) => {
  const {loan_info} = dataInfo

  const [userListing, setUserListing] = useState<(UserInfo & {fullname: string})[]>([])

  const {priority, company_id} = useAuth()

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    resetForm,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      officer_id: loan_info.loan_assignment?.officer_id || '',
    },
    validationSchema: schema,
    onSubmit: () => handleUpdateLoanAssignment(),
  })

  useEffect(() => {
    handleGetUsers()

    return () => {
      resetForm()
    }
  }, [])

  async function handleUpdateLoanAssignment() {
    const payload = {
      officer_id: +values.officer_id,
      loan_assignment_id: Number(loan_info.loan_assignment?.id) || 0,
      loan_id: +loan_info.id,
    }

    try {
      const {data} = await request.post<DataResponse<LoanAssignment>>(
        '/loan/assignment/upsert',
        payload
      )
      setLoanInfo({
        ...dataInfo,
        loan_info: {
          ...dataInfo.loan_info,
          loan_assignment: data.data,
        },
      })
      swalToast.fire({
        icon: 'success',
        title: 'Success',
      })
    } catch (error) {
      swalToast.fire({
        icon: 'error',
        title: DEFAULT_MSG_ERROR,
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGetUsers() {
    try {
      const {data} = await request.post<DataResponse<UserInfo[]>>('/user/listing', {
        company_id: +company_id,
        priority_great_than: 2, // except super admin and admin
        pageSize: 999999999999999,
        currentPage: 1,
      })

      Array.isArray(data.data) &&
        setUserListing(
          data.data.map((el) => ({
            ...el,
            fullname: getFullName(el),
          }))
        )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='mt-16px row gy-24px gx-32px'>
      <div className='col-4 border-end border-gray-200'>
        <h3 className='fs-16 fw-bold mb-16px'>Assignment</h3>

        {priority <= 2 && (
          <Select
            label='Assignee To'
            name='officer_id'
            options={userListing}
            keyValueOption={'id'}
            keyLabelOption={'fullname'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.officer_id.toString()}
            error={errors['officer_id']}
            touched={touched['officer_id']}
          />
        )}

        <div className='d-flex justify-content-end'>
          <Button
            type='submit'
            loading={isSubmitting}
            disabled={isSubmitting || loan_info.loan_assignment?.officer_id === +values.officer_id}
            className='btn-lg btn-primary'
            onClick={() => {
              handleSubmit()
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div className='col-8'>
        <h3 className='fs-16 fw-bold mb-16px'>Action Log</h3>

        <div className='content'>
          <span className='fs-14 text-gray-600'>Nothing show here.</span>
        </div>
      </div>
    </div>
  )
}

export default LoanAssignmentAndActionLog
