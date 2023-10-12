import clsx from 'clsx'
import {useLayout} from '../../core'
import {PageTitleWrapper} from './page-title'

interface IProps {}

const ToolbarWrapper = ({}: IProps) => {
  const {config, classes} = useLayout()
  if (!config.app?.toolbar?.display) {
    return null
  }

  return (
    <div
      id='kt_app_toolbar'
      className={clsx('app-toolbar', classes.toolbar.join(' '), config?.app?.toolbar?.class)}
    >
      <div
        id='kt_app_toolbar_container'
        className={clsx(
          'app-container',
          classes.toolbarContainer.join(' '),
          config.app?.toolbar?.containerClass,
          config.app?.toolbar?.minimize?.enabled ? 'app-toolbar-minimize' : '',
          {
            'container-fluid': config.app?.toolbar?.container === 'fluid',
            'container-xxl': config.app?.toolbar?.container === 'fixed',
          }
        )}
      >
        <PageTitleWrapper />
        {/* <Toolbar /> */}
      </div>
    </div>
  )
}

export {ToolbarWrapper}
