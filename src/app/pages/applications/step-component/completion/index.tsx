import {FC} from 'react'
import TableRender from '../../../../components/table-render'
import TitleComponent from '../../../../components/title-component'
import {PropsStepApplication} from '../../../../modules/auth'

const Completion: FC<PropsStepApplication> = (Props) => {
  const {config} = Props
  const data = Props.formik.values
  return (
    <div style={{padding: '30px 30px 0px 30px'}}>
      <div style={{paddingBottom: '30px'}}>
        <TitleComponent titleFather='PERSONAL LOAN APPLICATION' titleChild='Confidential' />
      </div>
      <div className='container'>
        <div className='row'>
          {config.map((children_config: any, index) => {
            const Component = children_config.Component
            const col = children_config.col
            const options = children_config.options
            if (!!Component) {
              return (
                <div key={index} style={{padding: '0.5px'}}>
                  <Component data={data} config={children_config} options={options} />
                </div>
              )
            }
            return (
              <div
                key={index}
                className={`col-lg-12 ${!!col ? col : 'col-xl-6'} `}
                style={{padding: '0.5px'}}
              >
                <TableRender
                  title={children_config.title}
                  config={children_config.config}
                  data={data}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Completion
