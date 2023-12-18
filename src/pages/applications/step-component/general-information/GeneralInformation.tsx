import clsx from 'clsx'
import {FC, Fragment, useEffect, useState} from 'react'
import Tippy from '@tippyjs/react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import Cookies from 'js-cookie'

import LookupCustomer from './LookupCustomer'
import {ApplicationConfig, PropsStepApplication} from '@/app/types'
import request from '@/app/axios'
import {getCurrentDate} from '@/app/utils/get-current-date'
import {useParams, useSearchParams} from 'react-router-dom'
import moment from 'moment'
import {useAuth} from '@/app/context/AuthContext'
import Button from '@/components/button/Button'
import Singpass from './Singpass'

const GeneralInformation: FC<PropsStepApplication> = (props) => {
  const {config = [], formik, setStepCompleted} = props
  const [searchParams, setSearchParams] = useSearchParams()

  const {applicationIdEdit} = useParams()
  const [dataMarketing, setDataMarketing] = useState<any>({})
  const [showPopup, setShowPopup] = useState(false)
  const [popupSingpass, setPopupSingpass] = useState(false)
  const {company_id} = useAuth()
  const {values, touched, errors, handleChange, handleBlur, setFieldValue, setValues} = formik

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

        console.log(123456, event.data)

        const fullName = event.data.name.value
        const {firstname, middlename, lastname} = splitName(fullName)

        const annual_api = event.data['noa-basic'].amount.value
        const cpf_months = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry.month.value
        )
        const cpf_amount = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry.amount.value
        )
        const cpf_date = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry.date.value
        )
        const cpf_employer = event.data?.cpfcontributions?.history?.map(
          (entry: any) => entry.employer.value
        )

        const values = {
          ...formik.values,
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
                  street_1: event.data.regadd.street.value,
                  country: event.data.regadd.country.desc,
                }
              : item
          ),
          gender: event.data.sex.desc === 'MALE' ? 'MALE' : 'FEMALE',
          residential_type: event.data.hdbtype?.desc || event.data.housingtype.desc || '',
          annual_income: annual_api || '',
          cpf_month: cpf_months || '',
          cpf_amount: cpf_amount || '',
          cpf_date: cpf_date || '',
          cpf_employer: cpf_employer || '',
        }
        handleFillFormSingpass(values)

        setTimeout(() => {
          formik.setValues({
            ...formik.values,
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
                    street_1: event.data.regadd.street.value,
                  }
                : item
            ),
            gender: event.data.sex.desc === 'MALE' ? 'male' : 'female',
            residential_type: event.data.hdbtype?.desc || event.data.housingtype.desc || '',
            annual_income: annual_api || '',
            nationality: event.data.race.desc || '',
            country: event.data.regadd.country.desc,
            cpf_month: cpf_months || '',
            cpf_amount: cpf_amount || '',
            cpf_date: cpf_date || '',
            cpf_employer: cpf_employer || '',

            // vehicle will return result when we have the offical api singpass
          })
        }, 0)
      } else return
    })
  }, [company_id])

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

      newDataSingpass = {...newDataSingpass, is_existing: 'existing'}
    } catch (error) {
      //nothing
    } finally {
      formik.setValues({...formik.values, ...newDataSingpass})
    }
  }

  async function handleGetApplicationById() {
    try {
      const {data} = await request.post(`/application/nric_no/${values['identification_no']}`, {
        company_id,
      })

      const formattedDateOfBirth = moment(data?.data.date_of_birth).format('YYYY-MM-DD')
      setStepCompleted(0)
      setFieldValue('country_id', data?.data.country_id || '')
      setFieldValue('customer_no', data?.data.customer_no || '')
      setFieldValue('firstname', data?.data.firstname || '')
      setFieldValue('gender', data?.data.gender || '')
      setFieldValue('identification_type', data?.data.identification_type || '')
      setFieldValue('lastname', data?.data.lastname || '')
      setFieldValue('middlename', data?.data.middlename || '')
      setFieldValue('is_existing', 'existing')

      setFieldValue('date_of_birth', formattedDateOfBirth || '')
    } catch (error) {
    } finally {
    }
  }

  // async function handleGetPersonData(payload) {
  //   try {
  //     const {data} = await axios.post('http://localhost:3001/getPersonData', payload)
  //   } catch (error) {
  //   } finally {
  //     Cookies.remove('sid')
  //     Cookies.remove('codeVerifier')
  //     setSearchParams('')
  //   }
  // }

  async function goToSingpass() {
    const dataPopup = window.open(
      'http://localhost:3001/singPass.html',
      'sharer',
      `resizeable=yes,width=1100,height=900,top=75,left=2300`
    )
    dataPopup?.postMessage({message: 'Singpass'}, 'http://localhost:3001')
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
      : 'input-wrap flex-shrink-0 flex-grow-1 flex-grow-xxl-0 w-100 w-xxl-200px'

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
        <div className='d-flex flex-row w-100 justify-content-between align-items-center p-12px hihihaha'>
          <div>
            <span className='fs-6 fw-medium text-gray-900'>
              You Can Fil Out The Form Using Your Singpass
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

      {showPopup && <LookupCustomer show={showPopup} onClose={() => setShowPopup(false)} />}

      {popupSingpass && <Singpass show={popupSingpass} onClose={() => setPopupSingpass(false)} />}
    </>
  )
}

export default GeneralInformation
