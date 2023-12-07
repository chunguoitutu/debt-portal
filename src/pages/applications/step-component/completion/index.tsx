import {FC} from 'react'

import TableRender from '@/components/table-render'
import TitleComponent from '@/components/title-component'
import {PropsStepApplication} from '@/app/types'

export interface DEF_completion {
  key?: string
  value?: string
  Component?: any
  options?: any[]
  keyFilter?: string
  lable?: string
  dependencyApi?: string
  elBehind?: string
  dollars?: string
  date?: boolean
}

export interface children_config_completion {
  col?: string
  title: string
  Component?: any
  config?: DEF_completion[][]
  options?: any[]
}

const Completion: FC<PropsStepApplication> = (Props) => {
  const {config} = Props
  const data = Props.formik.values
  return (
    <div>
      <div style={{paddingBottom: '30px'}}>
        <TitleComponent titleFather='PERSONAL LOAN APPLICATION' titleChild='Confidential' />
      </div>
      <div className='container'>
        <div className='row'>
          {config.map((children_config: any, index: number) => {
            const Component = children_config.Component
            const col = children_config.col
            const options = children_config.options
            if (!!Component) {
              return (
                <div key={index} className='p-0'>
                  <Component data={data} config={children_config} options={options} />
                </div>
              )
            }
            return (
              <div key={index} className={`col-lg-12 ${!!col ? col : 'col-xl-6'} p-0`}>
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
