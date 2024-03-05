import React, {useState} from 'react'
import Remarks from '../job-remarks'
import moment from 'moment'
import Button from '@/components/button/Button'

type Props = {}

const dataFake = [
  {
    id: '1646104e-388b-4cb7-9541-c50b4041268a',
    message:
      'Customers dont respond for 3 days, dont pick up the phone when they call, dont pay on time. Payment is past due 2 days. wqe',
    time: 1709607264849,
    user: 'admin001',
  },
  {
    id: '1646104e-388b-4cb7-9541-c50b4041268a',
    message:
      'Customers dont respond for 3 days, dont pick up the phone when they call, dont pay on time. Payment is past due 2 days. wqe',
    time: 1709607264849,
    user: 'admin001',
  },
]
const Done = (props: Props) => {
  const [dataRemarks, setDataRemarks] = useState(dataFake || [])
  const [openRemarks, setOpenRemark] = useState(false)

  return (
    <div className='p-30px '>
      <Button
        onClick={() => {
          setOpenRemark(true)
        }}
      >
        Remark
      </Button>
      {openRemarks && (
        <Remarks
          handleOnClose={() => {
            setOpenRemark(false)
          }}
          showClose={openRemarks}
          idUpdate={1}
          setRemarkList={setDataRemarks}
          data={dataRemarks}
        />
      )}
    </div>
  )
}

export default Done
