import Button from '@/components/button/Button'
import error from '../../../../app/images/error.jpg'
type Props = {
  handleClose: () => void
  mobile?: boolean
  dataSearch: {
    url: string
    screenshot: string
  }
  status: boolean
}

const GoogleSearch = ({handleClose, dataSearch, mobile = false, status}: Props) => {
  const handleLinkClick = (url) => {
    window.open(url, '_blank')
  }
  return (
    <div className='h'>
      <div className='py-30px ps-30px pe-10 h-100'>
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
            <h1 className='fs-16 text-gray-900 fw-semibold pb-8px m-0'>Search Results:</h1>
            <p
              onClick={() => handleLinkClick(dataSearch?.url)}
              style={{
                color: '#4147D5',
                fontStyle: 'italic',
                overflowWrap: 'break-word',
              }}
              className='fs-16  fw-semibold m-0  mw-100 cursor-pointer '
            >
              {dataSearch?.url}
            </p>
            <div className='pt-24px m-0'>
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
                  alt='google'
                  style={{
                    height: !!dataSearch?.screenshot ? 'auto' : 'calc(100vh - 460px)',
                    objectFit: 'cover',
                  }}
                  className='w-100 '
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          borderTop: '1px solid #F1F1F2',
        }}
        className='d-flex flex-end btn-repayment-schedule-calculator py-30px ps-30px pe-10'
      >
        <Button onClick={handleClose} type='reset' className='btn-lg fs-14 btn-secondary me-8px'>
          Cancel
        </Button>
        <Button
          disabled={!dataSearch?.url}
          onClick={() => handleLinkClick(dataSearch?.url)}
          type='submit'
          className='btn-lg btn-primary fs-14'
        >
          Go to Google
        </Button>
      </div>
    </div>
  )
}

export default GoogleSearch
