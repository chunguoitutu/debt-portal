import clsx from 'clsx'
import {PageTitleWrapper} from './page-title'

interface IProps {}

// eslint-disable-next-line no-empty-pattern
const ToolbarWrapper = ({}: IProps) => {
  return (
    <div className={clsx('pt-6 pb-6')}>
      <PageTitleWrapper />
    </div>
  )
}

export {ToolbarWrapper}
