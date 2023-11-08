import {useEffect, useRef, useState} from 'react'
import ImgSend from '../../../images/ImgSend'
import Button from '../../../components/button/Button'
import ImgAvataRemark from '../../../images/ImgAvataRemark'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'
import {useAuth} from '../../../modules/auth'
import Input from '../../../components/input'

export interface send {
  id: number
  message: string
  time: string
  user: string
}

const Remark = ({setSend, send}) => {
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
      setSend([
        ...send,
        {
          id: uuidv4(),
          message: value,
          time: Date.now(),
          user: currentUser?.username,
        },
      ])
    }
    setValue('')
    setScroll(!scroll)
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
      <div
        className={`py-30px px-30px`}
        style={{
          maxHeight: '250px',
          minHeight: '150px',
          overflowY: 'auto',
        }}
        ref={contentRef}
      >
        {send?.map((message: any, index: number) => (
          <div style={{display: 'flex', marginBottom: '16px'}} key={index}>
            <div
              style={{
                background: '#EFF2F5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '14px',
                flexShrink: '0',
              }}
              className='w-36px h-36px rounded-pill '
            >
              <ImgAvataRemark />
            </div>
            <div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500px',
                  lineHeight: '20px',
                  fontStyle: 'normal',
                  color: '#4B5675',
                  marginBottom: '0px',
                  wordBreak: 'break-all',
                }}
              >
                {message.message}
              </p>
              <div>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '500px',
                    lineHeight: '26px',
                    fontStyle: 'normal',
                    color: '#B5B5C3',
                    textTransform: 'capitalize',
                  }}
                >
                  {moment(message.time).format('hh:mm A - DD/MM/YYYY')}
                </span>
              </div>
              <span
                style={{
                  marginLeft: '4px',
                  fontSize: '12px',
                  fontWeight: '500px',
                  lineHeight: '26px',
                  fontStyle: 'normal',
                  color: '#0D6EFD',
                  textTransform: 'capitalize',
                }}
              >
                by {message.user}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{borderTop: '1px solid  #f1f1f2', padding: '14px'}}>
        <div className='d-flex align-items-center gap-3' style={{}}>
          <Input
            name='message'
            className='remake-input'
            placeholder='Enter remark...'
            classShared=''
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
            }}
          />
          <Button
            style={{display: 'flex', flexShrink: '0', width: '32px', height: '32px'}}
            onClick={() => {
              handleSubmit()
            }}
            className='btn-primary p-8px rounded-pill'
          >
            <ImgSend />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Remark
