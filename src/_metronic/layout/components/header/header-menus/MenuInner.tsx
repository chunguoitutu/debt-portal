import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'Applications'})} to='/dashboard' />
      <MenuItem title='Loans' to='/builder' />
      <MenuItem title='Borrowers' to='/dashboard' />
      <MenuItem title='My Tasks' to='/builder' />
      <MenuItem title='Transactions' to='/dashboard' />
    </>
  )
}
