import {convertSize} from '../../../../app/utils'
import Icons from '../../../../components/icons'
import {file} from '../employment/FileDocument'

type Props = {
  config?: any
  data?: any
}

const RenderFileDocument = ({config, data}: Props) => {
  return (
    <div style={{width: '100%', border: '1px solid #D4D4D4', padding: '0px'}}>
      <h1
        style={{
          padding: '8px 24px',
          alignItems: 'center',
          background: '#D4D4D4',
          lineHeight: '20px',
          fontWeight: '500px',
          fontStyle: 'normal',
          fontSize: '14px',
          color: '#4B5675',
          margin: '0px',
        }}
      >
        {config?.title}
      </h1>
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '57px',
        }}
      >
        {data?.file_documents.map((e: file, i: number) => (
          <div key={i}>
            {!!e?.base64 && (
              <div
                onClick={() => {
                  fetch(e.base64)
                    .then((response) => response.blob())
                    .then((blob) => {
                      const blobUrl = URL.createObjectURL(blob)

                      window.open(blobUrl, '_blank')
                    })
                    .catch((error) => {})
                }}
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '180px',
                  minWidth: '100px',
                  borderRadius: '5px',
                  position: 'relative',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #F1F1F2',
                    width: '100px',
                    height: '100px',
                  }}
                >
                  <Icons name={'ImgFoder'} />
                </div>
                <div
                  style={{
                    padding: '4px 16px 16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <p
                    style={{
                      maxWidth: '180px',
                      textAlign: 'center',
                      color: '#071437',
                      fontSize: '12px',
                      fontWeight: '500',
                      lineHeight: '16px',
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    {e?.document_name}- {convertSize(Number(e.size) || 0)}
                  </p>
                  <p
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: '#B5B5C3',
                      fontSize: '12px',
                      fontWeight: '500',
                      lineHeight: '16px',
                      padding: '0',
                      margin: '0',
                    }}
                  ></p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RenderFileDocument
