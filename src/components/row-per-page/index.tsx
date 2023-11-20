import Select from '../select/select'

type Props = {limit: number; lenghtData: number; page: number; setLimit?: any}

const RowPerPage = ({limit = 10, page = 1, lenghtData = 0, setLimit}: Props) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <p
        style={{
          color: '#78829D',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '20px',
          fontStyle: 'normal',
          marginBottom: '0px',
        }}
      >
        Row per page:
      </p>
      <div style={{marginRight: '16px', marginLeft: '16px'}}>
        <Select
          classShared=''
          className='pt-1 pb-1 ps-4 pe-9 '
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
      <p
        style={{
          fontStyle: 'normal',
          lineHeight: '20px',
          fontWeight: '500',
          fontSize: '14px',
          color: '#78829D',
          marginBottom: '0px',
        }}
      >
        {page * Number(limit) - (Number(limit) - 1) < lenghtData
          ? page * Number(limit) - (Number(limit) - 1)
          : lenghtData}
        -{page * Number(limit) > lenghtData ? lenghtData : page * Number(limit)} of {lenghtData}
      </p>
    </div>
  )
}

export default RowPerPage
