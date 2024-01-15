import Button from '@/components/button/Button'
import {Input} from '@/components/input'
import {faClose, faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import error from '../../../../app/images/error.jpg'

type Props = {
  handleClose: () => void
  handleReGetApi: () => void
  loadApiCheck: Boolean
  mobile?: boolean
  search: string
  setSearch: any
  status: boolean
  dataSearch: {
    url: string
    screenshot: string
  }
}

const CASSearch = ({
  handleClose,
  search,
  loadApiCheck,
  setSearch,
  dataSearch,
  handleReGetApi,
  mobile = false,
  status,
}: Props) => {
  const handleLinkClick = (url) => {
    window.open(url, '_blank')
  }
  return (
    <div className='h'>
      <div className='py-30px ps-30px pe-30px h-100'>
        {status ? (
          <div className='text-center h-100'>
            <div className='spinner-grow text-primary' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <div className='spinner-grow text-secondary' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <div className='spinner-grow text-success' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <div className='spinner-grow text-danger' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <div className='spinner-grow text-warning' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <div className='spinner-grow text-info' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <div className='spinner-grow text-light' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
            <div className='spinner-grow text-dark' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        ) : (
          <div className='p-0 m-0'>
            {!!dataSearch?.url && (
              <div className='d-flex justify-content-center align-items-center gap-16px'>
                <Input
                  classShared='flex-grow-1 h-30px mb-5'
                  placeholder='Search'
                  value={search}
                  disabled={!dataSearch?.url}
                  transparent={true}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleReGetApi()
                    }
                  }}
                  insertLeft={
                    !!dataSearch?.url ? (
                      <FontAwesomeIcon
                        className='ps-12px cursor-pointer text-gray-600 text-hover-gray-900'
                        icon={faSearch}
                        onClick={handleReGetApi}
                      />
                    ) : null
                  }
                  insertRight={
                    !!dataSearch?.url ? (
                      <FontAwesomeIcon
                        className='pe-12px cursor-pointer text-gray-600 text-hover-gray-900'
                        icon={faClose}
                        onClick={() => {
                          setSearch('')
                          handleReGetApi()
                        }}
                      />
                    ) : null
                  }
                />
                <Button
                  onClick={() => {
                    handleReGetApi()
                  }}
                  className='btn-primary align-self-center fs-6 text-white h-45px'
                  disabled={!dataSearch?.url}
                >
                  Search
                </Button>
              </div>
            )}
            <div className='pt-24px m-0'>
              {loadApiCheck ? (
                <div className='text-center'>
                  <div
                    className='spinner-border text-gray-500'
                    style={{
                      width: '3rem',
                      height: '3rem',
                    }}
                    role='status'
                  >
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
              ) : (
                <div
                  className='p-0 m-0 img-google-check'
                  style={{
                    maxHeight: mobile ? 'calc(100vh - 350px)' : 'calc(100vh - 450px)',
                    overflowY: 'auto',
                  }}
                >
                  <img
                    src={`${
                      !!dataSearch?.screenshot
                        ? `data:image/png;base64,${dataSearch?.screenshot}`
                        : error
                    }`}
                    style={{
                      height: !!dataSearch?.screenshot ? 'auto' : 'calc(100vh - 460px)',
                      objectFit: 'cover',
                    }}
                    alt='google'
                    className='w-100 '
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          borderTop: '1px solid #F1F1F2',
        }}
        className='d-flex flex-end btn-repayment-schedule-calculator py-30px ps-30px pe-30px'
      >
        <Button onClick={handleClose} type='reset' className='btn-lg btn-secondary me-8px fs-14'>
          Cancel
        </Button>
        <Button
          disabled={!dataSearch?.url}
          onClick={() => handleLinkClick(dataSearch?.url)}
          type='submit'
          className='btn-lg btn-primary fs-14'
        >
          Go to CAs Check
        </Button>
      </div>
    </div>
  )
}

export default CASSearch
