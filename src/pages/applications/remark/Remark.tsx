import {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'

import Button from '@/components/button/Button'
import ImgAvataRemark from '@/components/icons/ImgAvataRemark'
import {BsThreeDotsVertical} from 'react-icons/bs'
import Icons from '@/components/icons'
import {useAuth} from '../../../app/context/AuthContext'
import {RemarkItem} from '@/app/types'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'

type Props = {
  remarkList: RemarkItem[]
  idUpdate: string | number | any
  setRemarkList: Dispatch<SetStateAction<RemarkItem[]>>
}
const Remark: FC<Props> = ({remarkList = [], setRemarkList, idUpdate}) => {
  const [showMenu, setShowMenu] = useState(0)
  const [infoEdit, setInfoEdit] = useState<RemarkItem | null>(null)

  const {currentUser} = useAuth()

  const contentRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
    const textarea = textareaRef.current

    if (textarea) {
      textarea?.scroll({top: textarea.scrollHeight, behavior: 'smooth'})
      textarea?.setSelectionRange(textarea.value.length, textarea.value.length)
    }
  }, [infoEdit])

  const handleUpdate = async (payload, isCreate: boolean = false) => {
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
      } finally {
        setTimeout(() => {
          isCreate && handleScroll()
        }, 0)
      }
    } else {
      setRemarkList(payload)
    }
  }

  function handleScroll() {
    const contentDiv = contentRef.current

    if (contentDiv) {
      contentDiv?.scroll({top: contentDiv.scrollHeight, behavior: 'smooth'})
    }
  }

  const handleSubmit = () => {
    if (inputRef.current?.value.trim()) {
      const newRemark: RemarkItem = {
        id: uuidv4(),
        message: inputRef.current?.value || '',
        time: Date.now(),
        user: currentUser?.username || '',
      }
      handleUpdate([...remarkList, newRemark], true)
    }
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  function handleRemoveRemark(item: RemarkItem) {
    handleUpdate(remarkList.filter((remark) => remark.id !== item.id))
  }

  return (
    <div className='card h-100'>
      <div className='modal-header p-30px  border-bottom border-gray-200'>
        <h2 className='mb-0 text-capitalize text-gray-900 fw-bold fs-20'>remark</h2>
      </div>
      <div className='px-10px pt-10px  min-h-50px overflow-y-auto h-100' ref={contentRef}>
        <div className='pb-30px'>
          {remarkList?.map((message, index: number) => (
            <div
              className={`remark-item cursor-pointer
          position-relative
            d-flex mb-${remarkList.length === index + 1 ? '0' : '5'}`}
              key={index}
            >
              <div className='w-36px h-36px rounded-pill me-4 d-flex align-items-center justify-content-center flex-shrink-0 bg-gray-200'>
                <ImgAvataRemark />
              </div>
              <div className='w-100'>
                {infoEdit?.id === message.id ? (
                  <div className='p-5px w-100'>
                    <textarea
                      id='myTextarea'
                      onChange={(e) => {
                        setInfoEdit({...infoEdit, message: e.target.value})
                      }}
                      ref={textareaRef}
                      className='input-remark min-h-75px'
                      value={infoEdit.message}
                    />
                    <div>
                      <Button
                        onClick={() => {
                          setInfoEdit(null)
                        }}
                        className='btn-lg btn-secondary p-8px align-self-center me-8px fs-6'
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          const _remarkList = [...remarkList]
                          const idx = remarkList.findIndex((item) => item.id === infoEdit.id)

                          if (idx === -1) return setInfoEdit(null)

                          _remarkList.splice(idx, 1, infoEdit)
                          handleUpdate(_remarkList)
                          setInfoEdit(null)
                        }}
                        className='btn-lg btn-primary p-8px fs-6'
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className='mb-0 fs-14 fw-semibold text-break' style={{color: '#4B5675'}}>
                    {message.message}
                  </p>
                )}
                <div>
                  <span className='fs-12 fw-semibold text-capitalize text-B5B5C3 me-2'>
                    {moment(message.time).format('hh:mm A - MM/DD/YYYY')}
                  </span>
                  <span className='fs-sm fw-semibold text-capitalize text-primary'>
                    by {message.user}
                  </span>
                </div>
              </div>
              <div
                className='p-1 h-fit-content'
                onMouseEnter={() => setShowMenu(index + 1)}
                onMouseLeave={() => setShowMenu(0)}
              >
                <BsThreeDotsVertical className=' text-gray-600    text-hover-black cursor-pointer top-0 close-remark-icon' />
                {!!(showMenu === index + 1) && (
                  <div className='dropdown-menu-remark card   position-absolute'>
                    <button
                      onClick={(e) => {
                        setShowMenu(0)
                        setInfoEdit(message)
                      }}
                      className='dropdown-children-remark fs-14 text-start px-4 menu-item-child mt-2'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleRemoveRemark(message)
                        setShowMenu(0)
                      }}
                      className=' dropdown-children-remark fs-5 px-4 menu-item-child mb-3'
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-auto border-top border-gray-200 p-4'>
        <div className='d-flex align-items-center gap-3'>
          <input
            placeholder='Enter remark...'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleSubmit()
              }
            }}
            id='myInput'
            type='text'
            ref={inputRef}
            className='w-100 h-100  bg-transparent pe-10px input-remark-import'
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
