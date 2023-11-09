import {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import Button from '../../../components/button/Button'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
import {RemarkItem, useAuth} from '../../../modules/auth'
import ImgAvataRemark from '../../../components/icons/ImgAvataRemark'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose} from '@fortawesome/free-solid-svg-icons'
import Icons from '../../../components/icons'

type Props = {
  remarkList: RemarkItem[]
  setRemarkList: Dispatch<SetStateAction<RemarkItem[]>>
}
const Remark: FC<Props> = ({remarkList, setRemarkList}) => {
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
  const handleSubmit = () => {
    if (value !== '') {
      const newRemark: RemarkItem = {
        id: uuidv4(),
        message: value,
        time: Date.now(),
        user: currentUser?.username || '',
      }
      setRemarkList([...remarkList, newRemark])
    }
    setValue('')
    setScroll(!scroll)
  }

  function handleRemoveRemark(item: RemarkItem) {
    setRemarkList(remarkList.filter((remark) => remark.id !== item.id))
  }

  return (
    <div className='card'>
      <div style={{borderBottom: '1px solid  #f1f1f2', padding: '30px'}} className='modal-header '>
        <h2
          style={{
            marginBottom: '0px',
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '24px',
            textTransform: 'capitalize',
            color: '#071437',
          }}
        >
          remark
        </h2>
      </div>
      <div className='p-30px min-h-150px mh-325px overflow-y-auto' ref={contentRef}>
        {remarkList?.map((message, index: number) => (
          <div className='remark-item d-flex mb-5' key={index}>
            <div className='w-36px h-36px rounded-pill me-4 d-flex align-items-center justify-content-center flex-shrink-0 bg-gray-200'>
              <ImgAvataRemark />
            </div>
            <div>
              <p className='mb-0 fs-5 fw-semibold text-break'>{message.message}</p>
              <div>
                <span className='fs-sm fw-semibold text-capitalize text-gray-400 me-2'>
                  {moment(message.time).format('hh:mm A - DD/MM/YYYY')}
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
      <div style={{borderTop: '1px solid  #f1f1f2', padding: '14px'}}>
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
            style={{
              width: '100%',
              border: 'none',
              height: '100%',
              color: '#99A1B7',
              fontSize: '14px',
              fontWeight: '500',
              fontStyle: 'normal',
              background: 'transparent',
              lineHeight: '21.45px',
              paddingRight: '10px',
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
