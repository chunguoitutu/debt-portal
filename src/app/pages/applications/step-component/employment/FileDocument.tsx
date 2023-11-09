import {useEffect, useState} from 'react'
import ImgUploadFile from '../../../../images/ImgUploadFile'
import ImgFoder from '../../../../images/ImgFoder'
import {AiOutlineClose} from 'react-icons/ai'

export interface file {
  nameFile: string
  base64: string
  size: string
  type: string
}
export function TruncateText({text, maxLength}: {text: string; maxLength: number}) {
  const fileName = text.split('.')[0]
  if (fileName.length <= maxLength) {
    return <>{fileName}</>
  }

  const truncatedText = fileName.slice(0, maxLength) + '...'

  return <>{truncatedText}</>
}
const FileInput = (props: any) => {
  const {formik} = props.props

  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const handleFileChange = (event: any) => {
    const files = event.target.files
    setSelectedFiles([...files])
    event.target.value = ''
  }

  useEffect(() => {
    const base: any = []
    selectedFiles.forEach((file: any) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        base.push({
          nameFile: file.name || '',
          base64: e.target?.result,
          size: file.size,
          type: file.type,
        })
        formik.setFieldValue('file_document', [...formik?.values?.file_document, ...base])
      }
    })
  }, [selectedFiles])

  return (
    <div style={{width: '100%'}}>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {formik?.values?.file_document.map((data: file, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '185px',
                minWidth: '100px',
                borderRadius: '5px',
                border: '1px solid #B5B5C3',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '24px 0px 8px 0px',
                }}
              >
                {['jpg', 'jpeg', 'png', 'webp'].includes(data.type.split('/').reverse()[0]) ? (
                  <img
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      flexShrink: '0',
                    }}
                    alt={data?.nameFile}
                    src={data.base64}
                  />
                ) : (
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      objectFit: 'cover',
                      flexShrink: '0',
                    }}
                  >
                    <ImgFoder />
                  </div>
                )}

                <button
                  className='close'
                  style={{
                    cursor: 'position',
                    top: '16px',
                    right: '15.5px',
                    position: 'absolute',
                    outline: 'none',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#B5B5C3',
                    fontSize: '16px',
                  }}
                  onClick={() => {
                    const updatedFiles = [...formik?.values?.file_document]
                    updatedFiles.splice(index, 1)
                    formik.setFieldValue('file_document', updatedFiles)
                  }}
                >
                  <AiOutlineClose className='icon' />
                </button>
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
                    width: '100%',
                    textAlign: 'center',
                    color: '#071437',
                    fontSize: '12px',
                    fontWeight: '500',
                    lineHeight: '16px',
                    padding: '0',
                    margin: '0',
                  }}
                >
                  <TruncateText text={data?.nameFile} maxLength={15} />.
                  {data.type.split('/').reverse()[0]}
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
                >
                  {(Number(data.size) / (1024 * 1024)).toFixed(2)}MB
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <label
        style={{
          border: '1px dashed #0D6EFD',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '360px',
          height: '140px',
          padding: '24px',
          background: '#F1FAFF',
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.03)',
          borderRadius: '8px',
          position: 'relative',
        }}
        className='flex h-full w-full cursor-pointer flex-col items-center justify-center '
      >
        <div
          style={{
            display: 'flex',
            gap: '16px',
            cursor: 'pointer',
            padding: '24px',
            position: 'absolute',
          }}
        >
          <div style={{cursor: 'pointer', width: '40px', height: '40px', flexShrink: '0'}}>
            <ImgUploadFile />
          </div>
          <div style={{cursor: 'pointer'}}>
            <h1
              style={{
                color: '#071437',
                fontWeight: '500',
                lineHeight: '20px',
                textTransform: 'capitalize',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '0',
                margin: '0',
              }}
            >
              Quick File Uploader
            </h1>
            <p
              style={{
                color: '#B5B5C3',
                fontWeight: '400',
                lineHeight: '16px',
                textTransform: 'capitalize',
                fontSize: '12px',
                padding: '0',
                cursor: 'pointer',
                margin: '0',
              }}
            >
              Drag & Drop and choose files from compute (File upload maximum 200MB).
            </p>
          </div>
        </div>
        <input
          style={{
            opacity: '0',
          }}
          type={'file'}
          multiple
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

export default FileInput
