import {Select} from '../select'

type Props = {limit: number; lenghtData: number; page: number; setLimit?: any}

const RowPerPage = ({limit = 10, page = 1, lenghtData = 0, setLimit}: Props) => {
  return (
    <div className='d-flex align-items-center' style={{display: 'flex', alignItems: 'center'}}>
      <p className='text-gray-600 fs-14 mb-0 fw-semibold'>Row per page:</p>
      <div className='ms-16px me-16px'>
        <Select
          classShared=''
          className='pt-1 pb-1 ps-4 pe-9 fs-6'
          onChange={(e) => setLimit(e)}
          name='RowPerPage'
          isOptionDefault={false}
          value={limit}
          options={[
            {value: 5, label: 5},
            {value: 10, label: 10},
            {value: 20, label: 20},
            {value: 30, label: 30},
          ]}
        />
      </div>
      <p className='mb-0 text-gray-600 fs-14 '>
        {page * Number(limit) - (Number(limit) - 1) < lenghtData
          ? page * Number(limit) - (Number(limit) - 1)
          : lenghtData}
        -{page * Number(limit) > lenghtData ? lenghtData : page * Number(limit)} of {lenghtData}
      </p>
    </div>
  )
}

export default RowPerPage
