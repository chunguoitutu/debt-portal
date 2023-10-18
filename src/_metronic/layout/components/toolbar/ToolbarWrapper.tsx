import clsx from 'clsx'
import {PageTitleWrapper} from './page-title'

interface IProps {}

// eslint-disable-next-line no-empty-pattern
const ToolbarWrapper = ({}: IProps) => {
  return (
    <div className={clsx('my-8')}>
      <PageTitleWrapper />
    </div>
  )
}

export {ToolbarWrapper}
