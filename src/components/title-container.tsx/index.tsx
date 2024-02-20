import {Link} from 'react-router-dom'
import './styles.scss'
import Icons from '../icons'

type Props = {
  data: {
    title: string
    link: {
      to: string
      titleLink: string
    }[]
    render: string[]
    linkWhite?: {
      to: string
      titleLink: string
    }[]
  }
}

const TitleContainer = ({data}: Props) => {
  return (
    <div className='w-100 wrapper-title-container py-16px'>
      <div className='wrapper bg-transparent d-flex flex-column align-items-start py-8px py-md-0'>
        <h1 className='title-header-container'>{data.title}</h1>
        <div className='d-flex justify-content-center align-items-center '>
          {data?.link.map((el, i) => {
            return (
              <div key={i} className='d-flex justify-content-center align-items-center '>
                <Link to={el?.to} className='link-title-container fs-12 fw-semibold'>
                  {el.titleLink}
                </Link>
                <div className='px-12px'>
                  <Icons name={'ArrowLink'} />
                </div>
              </div>
            )
          })}
          {(data?.linkWhite || []).map((el, i) => {
            return (
              <div key={i} className='d-flex justify-content-center align-items-center '>
                <Link to={el?.to} className='link-title-container-white fs-12 '>
                  {el?.titleLink}
                </Link>
                <div className='px-12px'>
                  <Icons name={'ArrowLink'} />
                </div>
              </div>
            )
          })}
          {data?.render.map((e, i) => {
            return (
              <div key={i} className='d-flex justify-content-center align-items-center '>
                <p className='render-container-title'>{e}</p>
                {i + 1 < data?.render.length && (
                  <div className='px-12px'>
                    <Icons name={'ArrowLink'} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TitleContainer
