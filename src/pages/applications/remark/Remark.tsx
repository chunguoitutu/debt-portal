import {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import Button from '@/components/button/Button'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
import ImgAvataRemark from '@/components/icons/ImgAvataRemark'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose} from '@fortawesome/free-solid-svg-icons'
import Icons from '@/components/icons'
import {useAuth} from '../../../app/context/AuthContext'
import {ApplicationPayload, RemarkItem} from '@/app/types'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'

type Props = {
  remarkList: RemarkItem[]
  idUpdate: string | number | any
  setRemarkList: Dispatch<SetStateAction<RemarkItem[]>>
}
const Remark: FC<Props> = ({remarkList = [], setRemarkList, idUpdate}) => {
  const [value, setValue] = useState<string>('')
  const [scroll, setScroll] = useState(false)

  const {currentUser} = useAuth()

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const contentDiv = contentRef.current

    if (contentDiv) {
      contentDiv.scrollTop = contentDiv.scrollHeight
    }
  }, [scroll])

  const handleUpdate = async (payload) => {
    if (idUpdate) {
      try {
        await request.put('/remark/' + idUpdate, {
          data: {
            application_notes: JSON.stringify(payload),
          },
        })
        setRemarkList(payload)
      } catch (error) {
        swalToast.fire({
          title: 'The system is having an error, please try again in a few minutes.',
          icon: 'error',
        })
      }
    }
  }
  const handleSubmit = () => {
    if (value !== '') {
      const newRemark: RemarkItem = {
        id: uuidv4(),
        message: value,
        time: Date.now(),
        user: currentUser?.username || '',
      }
      handleUpdate([...remarkList, newRemark])
    }
    setValue('')
    setScroll(!scroll)
  }

  function handleRemoveRemark(item: RemarkItem) {
    handleUpdate(remarkList.filter((remark) => remark.id !== item.id))
  }

  return (
    <div className='card h-100'>
      <div className='modal-header p-30px border-bottom border-gray-200'>
        <h2 className='mb-0 text-capitalize text-gray-900 fw-bold fs-20'>remark</h2>
      </div>
      <div className='p-30px min-h-50px overflow-y-auto' ref={contentRef}>
        {remarkList?.map((message, index: number) => (
          <div
            className={`remark-item d-flex mb-${remarkList.length === index + 1 ? '0' : '5'}`}
            key={index}
          >
            <div className='w-36px h-36px rounded-pill me-4 d-flex align-items-center justify-content-center flex-shrink-0 bg-gray-200'>
              <ImgAvataRemark />
            </div>
            <div>
              <p className='mb-0 fs-5 fw-semibold text-break' style={{color: '#4B5675'}}>
                {message.message}
              </p>
              <div>
                <span className='fs-sm fw-semibold text-capitalize text-gray-400 me-2'>
                  {moment(message.time).format('hh:mm A - MM/DD/YYYY')}
                </span>
                <span className='fs-sm fw-semibold text-capitalize text-primary'>
                  by {message.user}
                </span>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faClose}
              className='align-self-center text-gray-600 text-hover-danger cursor-pointer p-1 close-remark-icon'
              onClick={() => handleRemoveRemark(message)}
            />
          </div>
        ))}
      </div>
      <div className='mt-auto border-top border-gray-200 p-4'>
        <div className='d-flex align-items-center gap-3' style={{}}>
          <input
            placeholder='Enter remark...'
            value={value}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleSubmit()
              }
            }}
            onChange={(e) => setValue(e.target.value)}
            className='w-100 h-100 fs-14 bg-transparent pe-10px fw-semibold text-gray-500'
            style={{
              border: 'none',
              outline: 'none',
            }}
          />
          <Button
            style={{display: 'flex', flexShrink: '0'}}
            onClick={() => {
              handleSubmit()
            }}
            className='btn-primary p-8px rounded-pill'
          >
            <Icons name='ImgSend' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Remark
