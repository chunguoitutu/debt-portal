import {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment'

import Button from '@/components/button/Button'
import ImgAvataRemark from '@/components/icons/ImgAvataRemark'
import Icons from '@/components/icons'
import {useAuth} from '../../../app/context/AuthContext'
import {RemarkItem} from '@/app/types'
import request from '@/app/axios'
import {swalToast} from '@/app/swal-notification'
import {KTIcon} from '@/_metronic/helpers'
import './style.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'

type Props = {
  remarkList: RemarkItem[]
  showClose?: boolean
  idUpdate: string | number | any
  setRemarkList: Dispatch<SetStateAction<RemarkItem[]>>
  handleOnClose: () => void
  small?: boolean
}
const Remark: FC<Props> = ({
  remarkList = [],
  setRemarkList,
  idUpdate,
  showClose = false,
  handleOnClose,
  small = false,
}) => {
  const [showMenu, setShowMenu] = useState(0)
  const [infoEdit, setInfoEdit] = useState<RemarkItem | null>(null)
  const [inputValue, setInputValue] = useState('')

  const {currentUser} = useAuth()

  const contentRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
    const textarea = textareaRef.current

    if (textarea) {
      textarea?.scroll({top: textarea.scrollHeight, behavior: 'smooth'})
      textarea?.setSelectionRange(textarea.value.length, textarea.value.length)
    }
    handleScroll()
  }, [infoEdit, inputValue])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setInputValue((prevValue) => prevValue + '\n')
    }
  }

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
    if (inputValue.replace(/\n/g, '<br>').trim()) {
      const newRemark: RemarkItem = {
        id: uuidv4(),
        message: inputValue.replace(/\n/g, '<br>') || '',
        time: Date.now(),
        user: currentUser?.username || '',
      }
      handleUpdate([...remarkList, newRemark], true)
    }
    setInputValue('')
  }

  function handleRemoveRemark(item: RemarkItem) {
    handleUpdate(remarkList.filter((remark) => remark.id !== item.id))
  }

  return (
    <div
      style={{
        borderRadius: small ? '8px' : '0px',
      }}
      className={`card h-100  ${small ? 'w-100' : 'w-900px min-w-100px'}   wrapper-remark-mes`}
    >
      <div
        style={{
          padding: !showClose ? '30px' : '42px',
        }}
        className='modal-header  border-bottom border-gray-200'
      >
        <h2 className='mb-0 text-capitalize text-gray-900 fw-bold fs-20'>remark</h2>
        {!showClose && (
          <div
            style={{
              padding: '6px',
            }}
            className='btn btn-sm btn-icon btn-active-color-primary d-none d-2xxl-block'
            onClick={handleOnClose}
          >
            <KTIcon className='fs-1' iconName='cross' />
          </div>
        )}
      </div>
      <div
        className={`px-30px pt-30px   overflow-y-auto ${small ? 'h-100 min-h-200px' : 'h-100 '}`}
        ref={contentRef}
      >
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
                        if (e.target.value === 'Enter') {
                          setInfoEdit({...infoEdit, message: '\n'})
                        } else {
                          setInfoEdit({...infoEdit, message: e.target.value})
                        }
                      }}
                      ref={textareaRef}
                      className='input-remark min-h-75px'
                      value={infoEdit.message.replace(/<br\s*\/?>/g, '\n')}
                    />
                    <div className='p-2 ps-0'>
                      <Button
                        onClick={() => {
                          setInfoEdit(null)
                        }}
                        className='btn-lg btn btn-secondary p-8px align-self-center me-8px fs-6'
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          const _remarkList = [...remarkList]
                          const idx = remarkList.findIndex((item) => item.id === infoEdit.id)

                          if (idx === -1) return setInfoEdit(null)

                          _remarkList.splice(idx, 1, {
                            ...infoEdit,
                            message: infoEdit.message.replace(/\n/g, '<br>'),
                          })
                          handleUpdate(_remarkList)
                          setInfoEdit(null)
                        }}
                        className='btn-lg btn btn-primary p-8px fs-6'
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p
                    className='mb-0 fs-14 fw-semibold text-break'
                    style={{color: '#4B5675'}}
                    dangerouslySetInnerHTML={{__html: message.message}}
                  />
                )}
                <div className='ms-2'>
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
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className='text-gray-600 remark-hover-threedots cursor-pointersssss'
                />

                {!!(showMenu === index + 1) && (
                  <div className='dropdown-menu-remark card position-absolute'>
                    <button
                      disabled={showClose}
                      onClick={(e) => {
                        setShowMenu(0)
                        setInfoEdit(message)
                      }}
                      className='dropdown-children-remark fs-14 text-start px-4 menu-item-child'
                    >
                      Edit
                    </button>
                    <button
                      disabled={showClose}
                      onClick={() => {
                        handleRemoveRemark(message)
                        setShowMenu(0)
                      }}
                      className=' dropdown-children-remark fs-5 text-start menu-item-child'
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
        <div className='d-flex justify-content-center align-items-end gap-4 ps-5 pe-'>
          <textarea
            disabled={showClose}
            placeholder='Enter remark...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={textareaRef}
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

export default Remark
