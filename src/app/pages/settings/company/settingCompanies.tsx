import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {NewCompanies} from './newCompanies'
import {KTIcon} from '../../../../_metronic/helpers'
import EnhancedTable from '../../../../_metronic/partials/widgets/tables/EnhancedTable'
import {
  REACT_APP_BASE_URL_API,
} from '../../../modules/auth/core/_requests'

type Props = {}
interface items {
  id: string
  company_name: string
  company_code: string
  business_uen: string
  address_id: string
  telephone: string
  email: string
  website: string
  registration_date: string
  status: number
}

const SettingCompanies = (props: Props) => {
  const [data, setData] = useState([])
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false)
  const [loadapi, setLoadApi] = useState<boolean>(false)

  const [editShowCreateAppModal, setEditShowCreateAppModal] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(REACT_APP_BASE_URL_API + 'config/company')
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Lỗi:', error)
      })
  }, [loadapi])
  return (
    <div>
      <div
        style={{marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'end'}}
        className='card-toolbar'
        data-bs-toggle='tooltip'
        data-bs-placement='top'
        data-bs-trigger='hover'
        title='Click to add a user'
      >
        <button
          onClick={() => setShowCreateAppModal(!showCreateAppModal)}
          className='btn btn-sm btn-light-primary'
        >
          <KTIcon iconName='plus' className='fs-3' />
          New Company
        </button>
      </div>
      <NewCompanies
        setLoadApi={setLoadApi}
        loadapi={loadapi}
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
      />
      <EnhancedTable
        EnhancedTableHead={Object.keys(data[0] || []).map((data) => [data])}
        rows={data?.map((item: items, index: number) => [
          index + 1,
          item.company_name,
          item.company_code,
          item.business_uen,
          item.address_id,
          item.telephone,
          item.email,
          item.website,
          item.registration_date,
          item.status,
          <div className='d-flex justify-content-end flex-shrink-0'>
            <div>
              <button
                onClick={() => setEditShowCreateAppModal(!editShowCreateAppModal)}
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              >
                <KTIcon iconName='pencil' className='fs-3' />
              </button>
              <NewCompanies
                setLoadApi={setLoadApi}
                loadapi={loadapi}
                show={editShowCreateAppModal}
                title='Edit'
                data={item}
                handleClose={() => setEditShowCreateAppModal(false)}
              />
            </div>

            <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
              <KTIcon iconName='trash' className='fs-3' />
            </button>
          </div>,
        ])}
      />
    </div>
  )
}

export default SettingCompanies
