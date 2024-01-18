import clsx from 'clsx'
import {FC, Fragment, useEffect, useState} from 'react'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import {Modal, Tab, Table, Tabs} from 'react-bootstrap'
import LookupCustomer from './LookupCustomer'
import {AddressTypeItem, ApplicationConfig, PropsStepApplication} from '@/app/types'
import request from '@/app/axios'
import {getCurrentDate} from '@/app/utils/get-current-date'
import {useLocation, useParams, useSearchParams} from 'react-router-dom'
import moment from 'moment'
import {useAuth} from '@/app/context/AuthContext'
import Button from '@/components/button/Button'
import Singpass from './Singpass'
import {KTIcon} from '@/_metronic/helpers'
import {
  PROPERTY_TYPE,
  capitalizeFirstText,
  convertMessageErrorRequired,
  convertResidentialTypeSingPass,
  getIdDefault,
  isFirstGetStepApplication,
  splitFullName,
} from '@/app/utils'
import {ApplicationStatus} from '@/app/types/enum'

const GeneralInformation: FC<PropsStepApplication> = (props) => {
  const {
    config = [],
    formik,
    singpass,
    optionListing,
    setOptionListing,
    setStepCompleted,
    setSingpass,
  } = props
  let [singpassValues, setSingpassValues] = useState<any>()
  const [activeTab, setActiveTab] = useState('cpf')

  const [cpfData, setCpfData] = useState<{
    date: string[]
    employer: string[]
    amount: string[]
    month: string[]
  } | null>(null)

  const {applicationIdEdit} = useParams()

  const [showMoreInformation, setShowMoreInformation] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupSingpass, setPopupSingpass] = useState<boolean>(false)
  const {company_id} = useAuth()
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    setErrors,
    setFieldError,
    registerField,
    unregisterField,
  } = formik
  const {pathname} = useLocation()

  async function onFetchDataList() {
    try {
      const newOption: {[key: string]: any[]} = {}

      const endpoint = config.filter((data) => !!data.dependencyApi)

      const requests = endpoint.map((d) =>
        request.post(d.dependencyApi || '', {status: true, pageSize: 99999, currentPage: 1})
      )

      if (!requests?.length) return

      const responses = await Promise.all(requests)

      responses.forEach((res, index) => {
        const config = endpoint[index]

        let data = res?.data?.data || []

        if (config.key === 'country_id') {
          data = data.filter((el: any) => el.nationality)
        }

        if (Array.isArray(data) && data?.length) {
          newOption[config.keyOfOptionFromApi || config.key] = data

          config.key !== 'country_id' &&
            !applicationIdEdit &&
            setFieldValue(config.key, getIdDefault(data)) // country uses default value in config
        }
      })

      setOptionListing((prev) => ({...prev, ...newOption}))
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    const keyOptionListing = Object.keys(optionListing)
    const isFirstGet = isFirstGetStepApplication({
      optionListing,
      config,
    })
    const isFirstGetAddressType = !keyOptionListing.includes('address_type')

    if (isFirstGet) {
      onFetchDataList()
    }

    if (isFirstGetAddressType) {
      GetDefaultAddressType()
    }
  }, [])

  useEffect(() => {
    if (values.is_existing === 'existing') {
      setErrors({})
    }
  }, [values.is_existing])

  useEffect(() => {
    const isApprovedOrRejected = [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED].includes(
      values.status
    )

    if (isApprovedOrRejected) return

    if (values.identification_type === 'foreign_identification_number') {
      registerField('identification_expiry', {
        validate(value) {
          // const dateNext2Months = moment(new Date(2024, 11, 31)).add(2, 'month')
          const dateNext2Months = moment(new Date()).add(2, 'month')
          const dateSelected = moment(value)

          const monthsDiff = dateSelected.diff(dateNext2Months, 'months', true)

          if (!value) {
            return convertMessageErrorRequired('ID Expired')
          }

          if (monthsDiff <= 0) {
            return 'The expiration date must be greater than 2 months from the current date'
          }

          return ''
        },
      })
    } else {
      setFieldValue('identification_expiry', '')
      unregisterField('identification_expiry')
      errors.identification_expiry && setFieldError('identification_expiry', undefined)
    }
  }, [values.identification_type])

  async function GetDefaultAddressType() {
    let defaultData = {}

    try {
      const {data} = await request.post('/config/address_type/listing', {
        status: true,
        pageSize: 99999,
        currentPage: 1,
      })

      const addressList = [...(data.data as AddressTypeItem[])]

      if (addressList.length) {
        setOptionListing((prev) => ({...prev, address_type: addressList}))
      }

      const homeAddress = addressList.find((el) =>
        el.address_type_name?.toLowerCase().includes('home')
      )

      if (homeAddress) {
        defaultData = {
          property_type: PROPERTY_TYPE[0].value,
          existing_staying: 1,
          housing_type: '',
          home_ownership: '',
          staying_condition: '',
          address_type_id: homeAddress.id,
        }
      } else {
        const addressDefault = addressList[0]

        defaultData = {
          is_default: 0,
          home_ownership: ' ',
          staying_condition: ' ',
          housing_type: ' ',
          address_type_id: addressDefault.id,
        }
      }
    } catch (error) {
      console.error('Address Type error')
    } finally {
      return defaultData
    }
  }

  useEffect(() => {
    if (!company_id) return
    window.addEventListener('message', async (event) => {
      try {
        /***
         * pick the address type in here
         */

        if (event.origin === 'http://localhost:3001') {
          setSingpass(true)

          const addressInfo: any = await GetDefaultAddressType()

          let property_type = 'HDB'
          let housing_type = ''

          if (event.data.housingtype.code) {
            property_type = 'Private Residential'
            housing_type = event.data.housingtype.code
          } else {
            housing_type = event.data.hdbtype.code
          }

          let residential_type = ''

          if (event.data.hdbtype?.desc !== '') {
            residential_type = event.data.hdbtype.desc
          } else if (event.data.housingtype?.desc !== '') {
            residential_type = event.data.housingtype.desc
          }

          const fullName = event.data.name.value
          const {firstname, lastname} = splitFullName(fullName)

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

          const values = {
            firstname: capitalizeFirstText(firstname as any) || '',
            lastname: capitalizeFirstText(lastname as any) || '',
            date_of_birth: event.data?.dob?.value || '',
            identification_no: event.data?.uinfin?.value || '',
            mobilephone_1: event.data?.mobileno.nbr?.value || '',
            email_1: event.data?.email?.value || '',
            address_contact_info: formik.values.address_contact_info.map((item, i) =>
              i === 0
                ? {
                    ...item,
                    ...(addressInfo as any),
                    postal_code: event.data.regadd.postal.value || '',
                    // street_1: event.data.regadd.unit.value  event.data.regadd.street.value,
                    ...(addressInfo?.existing_staying
                      ? {
                          property_type,
                          housing_type,
                          unit: event.data.regadd.unit.value || '',
                          block: event.data.regadd.block.value || '',
                          building: capitalizeFirstText(event.data.regadd.building.value) || '',
                          street: capitalizeFirstText(event.data.regadd.street.value) || '',
                        }
                      : {}),
                    country: event.data.regadd.country.desc || '',
                  }
                : item
            ),
            gender: event.data.sex.desc,
            residential_type: residential_type || '',
            annual_income: annual_api || '',
            nationality: event.data.race.desc || '',
            country: event.data.regadd.country.desc,
            month: cpf_months || '',
            amount: cpf_amount || '',
            date: cpf_date || '',
            employer: cpf_employer || '',
            // marketing_type_id: 1,
            // vehicle will return result when we have the offical api singpass
          }

          singpassValues = {
            // Create a copy of the values
            firstname: firstname || '',
            lastname: lastname || '',
            date_of_birth: event.data?.dob?.value || '',
            identification_no: event.data?.uinfin?.value || '',
            mobilephone_1: event.data?.mobileno.nbr?.value || '',
            email_1: event.data?.email?.value || '',
            address_contact_info: formik.values.address_contact_info.map((item, i) =>
              i === 0
                ? {
                    ...item,
                    ...(addressInfo as any),
                    postal_code: event.data.regadd.postal.value || '',
                    // street_1: event.data.regadd.unit.value  event.data.regadd.street.value,
                    ...(addressInfo?.existing_staying
                      ? {
                          property_type,
                          housing_type,
                          unit: event.data.regadd.unit.value || '',
                          block: event.data.regadd.block.value || '',
                          building: capitalizeFirstText(event.data.regadd.building.value) || '',
                          street: capitalizeFirstText(event.data.regadd.street.value) || '',
                        }
                      : {}),
                    country: event.data.regadd.country.desc || '',
                  }
                : item
            ),
            gender: event.data.sex.desc,
            residential_type: residential_type || '',
            annual_income: annual_api || '',
            nationality: event.data.race.desc || '',
            country: event.data.regadd.country.desc,
            month: cpf_months || '',
            amount: cpf_amount || '',
            date: cpf_date || '',
            employer: cpf_employer || '',
          }

          setSingpassValues(singpassValues)

          handleFillFormSingpass(values)
          onFetchDataList()
        } else return
      } catch (error) {
        //nothing
      }
    })
  }, [company_id, pathname])

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
      if (singpass && values.identification_no === singpassValues.identification_no) return

      const {data} = await request.post(`/application/nric_no/${values['identification_no']}`, {
        company_id,
      })

      const formattedDateOfBirth = moment(data?.data.date_of_birth).format('YYYY-MM-DD')
      setStepCompleted(0)
      //step 1
      setFieldValue('is_existing', 'existing', true)
      setFieldValue('firstname', data?.data.firstname || '', true)
      setFieldValue('lastname', data?.data.lastname || '', true)
      setFieldValue('customer_no', data?.data.customer_no || '', true)
      setFieldValue('residential_type', data?.data.borrower[0]?.residential_type || '', true)
      setFieldValue('identification_type', data?.data.identification_type || '', true)
      setFieldValue('gender', data?.data.gender || '', true)
      setFieldValue('date_of_birth', formattedDateOfBirth || '', true)
      setFieldValue('country_id', data?.data.country_id || '', true)
      // setFieldValue('identification_no_confirm', values['identification_no'], true)
    } catch (error) {
      setFieldValue('is_existing', 'new')
      setFieldValue('firstname', '')
      setFieldValue('lastname', '')
      setFieldValue('customer_no', '')
      setFieldValue('identification_type', '')
      setFieldValue('residential_type', '')
      setFieldValue('gender', '')
      setFieldValue('date_of_birth', '')
      setFieldValue('country_id', 192)
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

  function handleShowMoreInformation() {
    setShowMoreInformation(true)
    handleGetDataFromSingpass()
  }

  function renderComponent(item: ApplicationConfig) {
    const {
      key,
      keyOfOptionFromApi,
      data = [],
      column,
      options,
      keyLabelOfOptions,
      keyValueOfOptions,
      dependencyApi,
      typeInput,
      typeComponent,
    } = item
    const isRejectedOrApproved = [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED].includes(
      values.status || 0
    )

    let Component: any = item?.component

    const className = !column
      ? 'flex-grow-1'
      : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-250px'

    // nothing
    if (!Component) return

    if (typeComponent === 'Select') {
      // handle for select
      return (
        <Component
          error={errors[key]}
          touched={touched[key]}
          disabled={isRejectedOrApproved}
          value={values[key]}
          onChange={handleChange}
          onBlur={handleBlur}
          name={key}
          keyValueOption={keyValueOfOptions}
          keyLabelOption={keyLabelOfOptions}
          classShared={className}
          options={!!dependencyApi ? optionListing[keyOfOptionFromApi || key] || [] : options}
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
      if (
        values.status === ApplicationStatus.APPROVED ||
        values.status === ApplicationStatus.REJECTED
      )
        return <></>
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
            <Button onClick={goToSingpass}>Login With Singpass</Button>
          </div>
        </div>
      )
    }

    if (typeComponent === 'Input') {
      const isForeigner =
        key === 'identification_expiry' &&
        values.identification_type !== 'foreign_identification_number'
      const isDisabledForce =
        applicationIdEdit && ['identification_no', 'identification_no_confirm'].includes(key)

      return (
        <>
          <Component
            value={values[key]}
            onChange={handleChange}
            onBlur={(e: FocusEvent) => {
              handleBlur(e)
              key === 'identification_no' && handleGetApplicationById()
            }}
            type={typeInput}
            name={key}
            classShared={className}
            disabled={isRejectedOrApproved || isForeigner || isDisabledForce}
            touched={touched[key]}
            error={errors[key]}
            min='1900-01-01'
            max={key === 'date_of_birth' ? getCurrentDate() : undefined}
            insertRight={
              key === 'identification_no' ? (
                <Tippy offset={[40, 0]} content='Lookup Customer' disabled={!!applicationIdEdit}>
                  {/* Wrapper with a span tag to show tooltip */}
                  <div
                    className={clsx([
                      'supplement-input-advance search-icon d-flex align-items-center justify-content-center align-self-stretch border-0 border-left-1 rounded-left-0 bg-none px-4 text-gray-600',
                      !applicationIdEdit ? 'cursor-pointer' : 'disabled',
                    ])}
                    onClick={!applicationIdEdit ? handleShowPopup : undefined}
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
        const {label, column, isHide, className, required, typeComponent, key} = item
        if (isHide) return <Fragment key={i}></Fragment>

        const isForeigner =
          key === 'identification_expiry' &&
          values.identification_type === 'foreign_identification_number'

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
                (required || isForeigner) && 'required',
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

      {showPopup &&
        values.status !== ApplicationStatus.APPROVED &&
        values.status !== ApplicationStatus.REJECTED && (
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
