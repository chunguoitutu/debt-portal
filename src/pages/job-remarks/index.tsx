import Icons from '@/components/icons'
import {v4 as uuidv4} from 'uuid'
import './style.scss'
import moment from 'moment'
import Button from '@/components/button/Button'
import {RemarkItem} from '@/app/types'
import {Dispatch, SetStateAction, useRef, useState} from 'react'
import {useAuth} from '@/app/context/AuthContext'
import {swalToast} from '@/app/swal-notification'
import request from '@/app/axios'
type Props = {
  data: {
    id: string
    message: string
    time: number
    user: string
  }[]
  showClose?: boolean
  idUpdate: string | number | any
  setRemarkList: Dispatch<SetStateAction<RemarkItem[]>>
  handleOnClose: () => void
}

const Remarks = ({data, setRemarkList, idUpdate, showClose = false, handleOnClose}: Props) => {
  const [inputValue, setInputValue] = useState('')
  const {currentUser} = useAuth()

  const contentRef = useRef<HTMLDivElement>(null)

  function handleScroll() {
    const contentDiv = contentRef.current

    if (contentDiv) {
      contentDiv?.scroll({top: contentDiv.scrollHeight, behavior: 'smooth'})
    }
  }

  const handleSubmit = () => {
    if (inputValue.replace(/\n/g, '<br>').trim()) {
      const newRemark: RemarkItem = {
        id: uuidv4(),
        message: inputValue.replace(/\n/g, '<br>') || '',
        time: Date.now(),
        user: currentUser?.username || '',
      }
      handleUpdate([...data, newRemark], true)
    }
    setInputValue('')
  }

  const handleUpdate = async (payload, isCreate: boolean = false) => {
    if (idUpdate) {
      try {
        await request.put('site/remark/' + idUpdate, {
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
      } finally {
        setTimeout(() => {
          isCreate && handleScroll()
        }, 0)
      }
    } else {
      setRemarkList(payload)
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setInputValue((prevValue) => prevValue + '\n')
    }
  }

  return (
    <div className='wrapper-remarks-job flex-column'>
      <div
        style={{
          borderBottom: '1px solid #DBDFE9',
        }}
        className='p-12px d-flex gap-16px '
      >
        <button onClick={handleOnClose} className='button-remark-job'>
          <Icons name={'BackLeftRemark'} />
        </button>
        <h1 className='m-0 p-0 fs-16 fw-bold'>Job Remarks</h1>
      </div>
      <div ref={contentRef} className='messenger-remarks-job d-flex flex-column gap-12px'>
        {data?.map((el, idx) => {
          return (
            <div key={idx} className='d-flex align-items-start gap-12px'>
              <div className=' bg-primary  mt-4px w-10px h-10px flex-shrink-0 rounded-circle'></div>
              <div className='w-100 d-flex flex-column gap-4px'>
                <div className='d-flex justify-content-between align-items-end'>
                  <span className='fs-14 fw-semibold text-gray-900'>
                    {moment(el?.time).format('DD MMM, YYYY')}
                  </span>
                  <div className='fs-12 fw-normal text-gray-600'>
                    {moment().diff(el?.time, 'days')}{' '}
                    {[0, 1].includes(Number(moment().diff(el?.time, 'days')))
                      ? `day ago`
                      : 'days ago'}{' '}
                    / at {moment(el?.time).format('HH:mm:ss')}
                  </div>
                </div>
                <p
                  className='mb-0 fs-14 fw-semibold text-break '
                  style={{color: '#4B5675'}}
                  dangerouslySetInnerHTML={{__html: el?.message}}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className='mt-auto border-top border-gray-200 p-12px '>
        <div className='d-flex justify-content-center align-items-end gap-4'>
          <textarea
            placeholder='Enter remark...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            id='myInput'
            className='w-100 min-h-50px  input-remark-import'
            style={{
              border: '1px solid ',
              outline: 'none',
            }}
          />
          <div className=' flex justify-content-end align-items-end align-self-center'>
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
    </div>
  )
}

export default Remarks
