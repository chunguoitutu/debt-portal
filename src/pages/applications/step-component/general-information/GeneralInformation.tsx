import clsx from 'clsx'
import {FC, Fragment, useEffect, useRef, useState} from 'react'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import Cookies from 'js-cookie'
import {createPortal} from 'react-dom'
import {Modal, Tab, Table, Tabs} from 'react-bootstrap'

import LookupCustomer from './LookupCustomer'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'
import request from '@/app/axios'
import {getCurrentDate} from '@/app/utils/get-current-date'
import {useLocation, useParams, useSearchParams} from 'react-router-dom'
import moment from 'moment'
import {useAuth} from '@/app/context/AuthContext'
import Button from '@/components/button/Button'
import Singpass from './Singpass'
import {KTIcon} from '@/_metronic/helpers'
import {convertResidentialTypeSingPass} from '@/app/utils'

const modalsRoot = document.getElementById('root-modals') || document.body

const GeneralInformation: FC<PropsStepApplication> = (props) => {
  const {config = [], formik, setStepCompleted, setSingpass, singpass} = props
  const [searchParams, setSearchParams] = useSearchParams()
  const [useSingpass, setUseSingpass] = useState(false)
  const [activeTab, setActiveTab] = useState('cpf')

  const [cpfData, setCpfData] = useState<{
    date: string[]
    employer: string[]
    amount: string[]
    month: string[]
  } | null>(null)

  const {applicationIdEdit} = useParams()
  const [dataMarketing, setDataMarketing] = useState<any>({})
  const [showPopup, setShowPopup] = useState(false)
  const [popupSingpass, setPopupSingpass] = useState<boolean>(false)
  const {company_id} = useAuth()
  const {values, touched, errors, handleChange, handleBlur, setFieldValue, setValues} = formik
  const {pathname} = useLocation()

  async function onFetchDataList() {
    try {
      const updatedDataMarketing: any = {...dataMarketing}
      const endpoint = config.filter((data) => !!data.dependencyApi)

      const requests = endpoint.map((d) =>
        request.post(d.dependencyApi || '', {status: true, pageSize: 99999, currentPage: 1})
      )

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const key = endpoint[index].key

        let data = res?.data?.data || []
        if (key === 'country_id') {
          data = data.filter((el: any) => el.nationality)
        }
        updatedDataMarketing[key] = data
      })

      setDataMarketing(updatedDataMarketing)
      !applicationIdEdit &&
        setFieldValue(
          `marketing_type_id`,
          updatedDataMarketing?.marketing_type_id.length > 0
            ? updatedDataMarketing?.marketing_type_id.filter((el: any) => +el.is_default === 1)
                .length > 0
              ? updatedDataMarketing?.marketing_type_id.filter((el: any) => +el.is_default === 1)[0]
                  .id
              : updatedDataMarketing?.marketing_type_id[0].id
            : ''
        )
      !applicationIdEdit &&
        setFieldValue(`country_id`, updatedDataMarketing?.country_id.length > 0 ? '192' : '')
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    onFetchDataList()
  }, [])

  useEffect(() => {
    const authCode = searchParams.get('code')
    const codeVerifier = Cookies.get('codeVerifier')

    if (!authCode || !codeVerifier) return

    // handleGetPersonData({authCode, codeVerifier})
  }, [])

  useEffect(() => {
    if (!company_id) return
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:3001') {
        // console.log(1324, event.data)
        setSingpass(true)

        // console.log(123456, event.data)

        const fullName = event.data.name.value
        const {firstname, middlename, lastname} = splitName(fullName)

        const annual_api = event.data['noa-basic']?.amount?.value
        const cpf_months = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry.month.value
        )
        const cpf_amount = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry?.amount?.value
        )
        const cpf_date = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry?.date?.value
        )
        const cpf_employer = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry?.employer?.value
        )

        const unit = event.data?.regadd?.unit?.value || ''

        const block = event.data?.regadd?.block?.value || ''

        const street_full = `${block} ${unit} ${event.data?.regadd?.street?.value || ''}`

        const values = {
          firstname: firstname || '',
          middlename: middlename || '',
          lastname: lastname || '',
          date_of_birth: event.data?.dob?.value || '',
          identification_no: event.data?.uinfin?.value || '',
          mobilephone_1: event.data?.mobileno.nbr?.value || '',
          email_1: event.data?.email?.value || '',
          address_contact_info: formik.values.address_contact_info.map((item, i) =>
            i === 0
              ? {
                  ...item,
                  postal_code: event.data.regadd.postal.value,
                  // street_1: event.data.regadd.unit.value  event.data.regadd.street.value,
                  street_1: street_full,
                  country: event.data.regadd.country.desc,
                }
              : item
          ),
          gender: event.data.sex.desc,
          residential_type: event.data.hdbtype?.desc || event.data.housingtype.desc || '',
          annual_income: annual_api || '',
          nationality: event.data.race.desc || '',
          country: event.data.regadd.country.desc,
          month: cpf_months || '',
          amount: cpf_amount || '',
          date: cpf_date || '',
          employer: cpf_employer || '',
          // marketing_type_id: dataMarketing,
          // marketing_type_id: 1,
          // vehicle will return result when we have the offical api singpass
        }

        handleFillFormSingpass(values)
        onFetchDataList()
      } else return
    })
  }, [company_id, pathname])

  function splitName(fullName: string) {
    const arr = fullName?.trim()?.split(' ')

    if (!Array.isArray(arr) || arr.length === 0) {
      return {}
    }

    const leng = arr.length

    if (leng === 1) {
      return {
        firstname: arr[0],
      }
    }
    if (leng === 2) {
      return {
        firstname: arr[0],
        lastname: arr[1],
      }
    }
    return {
      firstname: arr[0],
      middlename: arr.slice(1, leng - 1).join(' '),
      lastname: arr[leng - 1],
    }
  }

  function handleShowPopup() {
    setShowPopup(!showPopup)
  }

  async function handleFillFormSingpass(dataSingpass: any) {
    let newDataSingpass = {...dataSingpass}

    try {
      const NRIC = dataSingpass.identification_no

      // send api
      await request.post(`/application/nric_no/${NRIC}`, {
        company_id,
      })

      // Update newDataSingpass after the API call
      newDataSingpass = {
        ...newDataSingpass,
        is_existing: 'existing',
      }
    } catch (error) {
      //nothing
    } finally {
      // Update formik values with the modified newDataSingpass
      formik.setValues({
        ...formik.values,
        ...newDataSingpass,
        residential_type: convertResidentialTypeSingPass(newDataSingpass.residential_type),
      })
    }
  }

  async function handleGetApplicationById() {
    try {
      const {data} = await request.post(`/application/nric_no/${values['identification_no']}`, {
        company_id,
      })

      const formattedDateOfBirth = moment(data?.data.date_of_birth).format('YYYY-MM-DD')
      setStepCompleted(0)
      //step 1
      setFieldValue('country_id', data?.data.country_id || '')
      setFieldValue('customer_no', data?.data.customer_no || '')
      setFieldValue('firstname', data?.data.firstname || '')
      setFieldValue('gender', data?.data.gender || '')
      setFieldValue('identification_type', data?.data.identification_type || '')
      setFieldValue('lastname', data?.data.lastname || '')
      setFieldValue('middlename', data?.data.middlename || '')
      setFieldValue('is_existing', 'existing')
      setFieldValue('date_of_birth', formattedDateOfBirth || '')

      //step 3
      setFieldValue('mobilephone_1', data?.data?.borrower[0].mobilephone_1 || '')
      setFieldValue('mobilephone_2', data?.data?.borrower[0].mobilephone_2 || '')
      setFieldValue('mobilephone_3', data?.data?.borrower[0].mobilephone_3 || '')
      setFieldValue('homephone', data?.data?.borrower[0].homephone || '')
      setFieldValue('email_1', data?.data?.borrower[0].email_1 || '')
      setFieldValue('email_2', data?.data?.borrower[0].email_2 || '')

      //address
      setFieldValue(
        'address_contact_info[0].address_type_id',
        data?.data?.borrower[0].address[0]?.address_type_id || ''
      )
      setFieldValue(
        'address_contact_info[0].street_1',
        data?.data?.borrower[0].address[0]?.street_1 || ''
      )
      setFieldValue(
        'address_contact_info[0].street_2',
        data?.data?.borrower[0].address[0]?.street_2 || ''
      )
      setFieldValue('address_contact_info[0].city', data?.data?.borrower[0].address[0]?.city || '')
      setFieldValue(
        'address_contact_info[0].state',
        data?.data?.borrower[0].address[0]?.state || ''
      )
      setFieldValue(
        'address_contact_info[0].address_label',
        data?.data?.borrower[0].address[0]?.address_label || ''
      )
      setFieldValue(
        'address_contact_info[0].postal_code',
        data?.data?.borrower[0].address[0]?.postal_code || '123'
      )

      //step 4
      setFieldValue('company_name', data?.data?.borrower[0].employment[0].company_name || '')
      setFieldValue(
        'company_telephone',
        data?.data?.borrower[0].employment[0].company_telephone || ''
      )
      setFieldValue('specialization', data?.data?.borrower[0].employment[0].specialization || '')
      setFieldValue('position', data?.data?.borrower[0].employment[0].position || '')
      setFieldValue('occupation', data?.data?.borrower[0].employment[0].occupation || '')
      setFieldValue('address', data?.data?.borrower[0].employment[0].address || '')
      setFieldValue('portal_code', data?.data?.borrower[0].employment[0].portal_code || '')
      setFieldValue('annual_income', data?.data?.borrower[0].employment[0].annual_income || '')
      setFieldValue('pay_date', data?.data?.borrower[0].employment[0].pay_date || '')
      setFieldValue('bankrupted', data?.data?.borrower[0].employment[0].bankrupted || '')
      setFieldValue('bankrupt_plan', data?.data?.borrower[0].employment[0].bankrupt_plan || '')

      //step 5
      setFieldValue('bank_name_1', data?.data?.borrower[0].bank_account[0].bank_name_1 || '')
      setFieldValue('bank_code_1', data?.data?.borrower[0].bank_account[0].bank_code_1 || '')
      setFieldValue(
        'account_number_1',
        data?.data?.borrower[0].bank_account[0].account_number_1 || ''
      )
      /////
      setFieldValue('bank_name_2', data?.data?.borrower[0].bank_account[0].bank_name_2 || '')
      setFieldValue('bank_code_2', data?.data?.borrower[0].bank_account[0].bank_code_2 || '')
      setFieldValue(
        'account_number_2',
        data?.data?.borrower[0].bank_account[0].account_number_2 || ''
      )
    } catch (error) {
      setFieldValue('is_existing', 'new')
    } finally {
    }
  }

  async function handleGetDataFromSingpass() {
    try {
      const {data} = await request.get(`/application/detail/${applicationIdEdit}`)
      const {cpf} = data.data || {}

      if (cpf) {
        const date = JSON.parse(cpf.date)
        const employer = JSON.parse(cpf.employer)
        const amount = JSON.parse(cpf.amount)
        const month = JSON.parse(cpf.month)

        setCpfData({date, employer, amount, month})
      }
    } catch (error) {
      //nothing
    }
  }

  async function goToSingpass() {
    const dataPopup = window.open(
      'http://localhost:3001/singPass.html',
      'sharer',
      `resizeable=yes,width=1100,height=900,top=75,left=2300`
    )
    dataPopup?.postMessage({message: 'Singpass'}, 'http://localhost:3001')
  }

  const [showMoreInformation, setShowMoreInformation] = useState(false)

  function handleShowMoreInformation() {
    setShowMoreInformation(true)
    handleGetDataFromSingpass()
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
      : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-250px'

    // nothing
    if (!Component) return

    // Special cases should be checked in advance
    if (key === 'firstname') {
      return <Component {...props} />
    }
    // End special cases

    if (key === 'identification_no') {
      return (
        <Component
          value={values[key]}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e)
            if (!!values[key].trim()) {
              handleGetApplicationById()
            }
          }}
          type={typeInput}
          name={key}
          classShared={className}
          touched={touched[key]}
          error={errors[key]}
          min='1900-01-01'
          max={getCurrentDate()}
          disabled={values.status === 3 || values.status === 2 ? true : false}
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
      )
    }
    if (typeComponent === 'Select') {
      // handle for select
      return (
        <Component
          error={errors[key]}
          touched={touched[key]}
          disabled={values.status === 3 || values.status === 2 ? true : false}
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
          disabled={true}
          label={item.label}
          checked={values[key] === item.value}
          value={item.value}
          onChange={handleChange}
        />
      ))
    }
    if (typeComponent === 'Button') {
      if (applicationIdEdit || values.is_existing === 'existing') return <></>
      return (
        <div className='d-flex flex-row w-100 justify-content-between align-items-center p-12px fill-singpass'>
          <div>
            <span className='fs-6 fw-medium text-gray-900'>
              You can fill out the form using your Singpass
            </span>
            <br />
            <span className='fs-7 fw-normal text-gray-400'>Or fill the form to register</span>
          </div>
          <div>
            <Button onClick={goToSingpass}>Go To Singpass</Button>
          </div>
        </div>
      )
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
            disabled={values.status === 3 || values.status === 2 ? true : false}
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
      {singpass && (
        <div className='d-flex justify-content-end align-items-end'>
          <Button className='w-50 btn btn-secondary' onClick={() => handleShowMoreInformation()}>
            More Information
          </Button>
        </div>
      )}

      {(values.month && values.month.length > 0) ||
        (values.amount && values.amount.length > 0) ||
        (values.employer && values.employer.length > 0) ||
        (values.date && JSON.parse(values.date)?.length > 0 && (
          <div className='d-flex justify-content-end align-items-end'>
            <Button className='w-50 btn btn-secondary' onClick={() => handleShowMoreInformation()}>
              More Information
            </Button>
          </div>
        ))}

      {showPopup && values.status !== 2 && values.status !== 3 && (
        <LookupCustomer
          show={showPopup}
          onClose={() => {
            setShowPopup(false)
          }}
          formik={formik}
        />
      )}

      {popupSingpass && <Singpass show={popupSingpass} onClose={() => setPopupSingpass(false)} />}

      {showMoreInformation && (
        <div>
          {/* Render your popup content here */}
          <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            style={{}}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-900px'
            show={showMoreInformation}
            backdrop={true}
            onHide={() => setShowMoreInformation(false)}
          >
            <div className='modal-header p-30px'>
              <h2 className='m-0'>More Information From Singpass</h2>
              <div
                className='btn btn-sm btn-icon btn-active-color-primary'
                onClick={() => setShowMoreInformation(false)}
              >
                <KTIcon className='fs-1' iconName='cross' />
              </div>
            </div>
            <div
              style={{maxHeight: 'calc(100vh - 400px)', overflowY: 'auto'}}
              className='modal-body p-30px  '
            >
              <Tabs
                activeKey={activeTab}
                onSelect={(key: any) => setActiveTab(key)}
                id='controlled-tab-example'
              >
                <Tab
                  eventKey='cpf'
                  title='CPF'
                  tabClassName={
                    activeTab === 'cpf' ? 'select-tab-information' : 'fs-6 fw-bold text-gray-600'
                  }
                >
                  <Table responsive='sm' className='table-bordered p-4'>
                    <thead
                      style={{backgroundColor: '#F9F9F9'}}
                      className='fs-16 fw-medium text-gray-600'
                    >
                      <tr>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'></th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Date
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Employer
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Amount
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Month
                        </th>
                      </tr>
                    </thead>
                    {Array.isArray(cpfData?.date) ? (
                      <tbody>
                        {cpfData?.date?.map((date, index) => (
                          <tr key={index}>
                            <th className='fs-6 fw-medium text-center' style={{color: '#071437'}}>
                              {index + 1}
                            </th>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              {moment(date)?.format('YYYY/MM/DD') ?? 'No Information'}
                            </td>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              {cpfData?.employer?.[index] ?? 'No Information'}
                            </td>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              ${cpfData?.amount?.[index] ?? 'No Information'}
                            </td>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              {moment(cpfData?.month?.[index])?.format('YYYY/MM') ??
                                'No Information'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            colSpan={5}
                            className='fs-6 fw-medium text-center text-gray-600 fw-medium'
                            style={{color: '#071437'}}
                          >
                            No matching records found
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </Table>
                </Tab>
                <Tab
                  eventKey='vehicle'
                  title='Vehicle'
                  tabClassName={
                    activeTab === 'vehicle'
                      ? 'select-tab-information'
                      : 'fs-6 fw-bold text-gray-600'
                  }
                >
                  <Table responsive='sm' className='table-bordered p-4'>
                    <thead
                      style={{backgroundColor: '#F9F9F9'}}
                      className='fs-16 fw-medium text-gray-600'
                    >
                      <tr>
                        <th className='fs-5 fw-medium' style={{color: '#78829d'}} scope='col'></th>
                        <th className='fs-5 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Date
                        </th>
                        <th className='fs-5 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Employer
                        </th>
                        <th className='fs-5 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Amount
                        </th>
                        <th className='fs-5 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Month
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td
                          colSpan={5}
                          className='fs-6 fw-medium text-center text-gray-600 fw-bold'
                          style={{color: '#071437'}}
                        >
                          No matching records found
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </div>

            <div className='border-top border-gray-200'>
              <div className='d-flex justify-content-end p-30px'>
                <Button
                  type='reset'
                  onClick={() => setShowMoreInformation(false)}
                  className='btn-lg btn-secondary align-self-center me-8px fs-6'
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      {showMoreInformation && !applicationIdEdit && (
        <div>
          {/* Render your popup content here */}
          <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            style={{}}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-900px'
            show={showMoreInformation}
            backdrop={true}
            onHide={() => setShowMoreInformation(false)}
          >
            <div className='modal-header p-30px'>
              <h2 className='m-0'>More Information From Singpass</h2>
              <div
                className='btn btn-sm btn-icon btn-active-color-primary'
                onClick={() => setShowMoreInformation(false)}
              >
                <KTIcon className='fs-1' iconName='cross' />
              </div>
            </div>
            <div
              style={{maxHeight: 'calc(100vh - 400px)', overflowY: 'auto'}}
              className='modal-body p-30px  '
            >
              <Tabs
                activeKey={activeTab}
                onSelect={(key: any) => setActiveTab(key)}
                id='controlled-tab-example'
              >
                <Tab
                  eventKey='cpf'
                  title='CPF'
                  tabClassName={
                    activeTab === 'cpf' ? 'select-tab-information' : 'fs-6 fw-bold text-gray-600'
                  }
                >
                  <Table responsive='sm' className='table-bordered p-4'>
                    <thead
                      style={{backgroundColor: '#F9F9F9'}}
                      className='fs-16 fw-medium text-gray-600'
                    >
                      <tr>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'></th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Date
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Employer
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Amount
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Month
                        </th>
                      </tr>
                    </thead>
                    {formik.values &&
                    Array.isArray(formik.values.date) &&
                    formik.values.date.length > 0 ? (
                      <tbody>
                        {formik.values.date.map((date, index) => (
                          <tr key={index}>
                            <th className='fs-6 fw-medium text-center' style={{color: '#071437'}}>
                              {index + 1}
                            </th>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              {moment(formik.values.date[index]).format('YYYY/MM/DD') ||
                                'No Information'}
                            </td>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              {formik.values.employer[index] || 'No Information'}
                            </td>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              ${formik.values.amount[index] || 'No Information'}
                            </td>
                            <td className='fs-6 fw-medium' style={{color: '#071437'}}>
                              {moment(formik.values.month[index]).format('YYYY/MM') ||
                                'No Information'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            colSpan={5}
                            className='fs-6 fw-medium text-center text-gray-600 fw-medium'
                            style={{color: '#071437'}}
                          >
                            No matching records found
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </Table>
                </Tab>
                <Tab
                  eventKey='vehicle'
                  title='Vehicle'
                  tabClassName={
                    activeTab === 'vehicle'
                      ? 'select-tab-information'
                      : 'fs-6 fw-bold text-gray-600'
                  }
                >
                  <Table responsive='sm' className='table-bordered p-4'>
                    <thead
                      style={{backgroundColor: '#F9F9F9'}}
                      className='fs-16 fw-medium text-gray-600'
                    >
                      <tr>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'></th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Date
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Employer
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Amount
                        </th>
                        <th className='fs-4 fw-medium' style={{color: '#78829d'}} scope='col'>
                          Month
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td
                          colSpan={5}
                          className='fs-6 fw-medium text-center text-gray-600 fw-bold'
                          style={{color: '#071437'}}
                        >
                          No matching records found
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </div>

            <div className='border-top border-gray-200'>
              <div className='d-flex justify-content-end p-30px'>
                <Button
                  type='reset'
                  onClick={() => setShowMoreInformation(false)}
                  className='btn-lg btn-secondary align-self-center me-8px fs-6'
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}

export default GeneralInformation
