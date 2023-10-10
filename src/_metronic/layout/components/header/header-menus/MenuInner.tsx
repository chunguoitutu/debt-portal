import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'Applications'})} to='/dashboard' />
      <MenuItem title='Loans' to='/loans' />
      <MenuItem title='Borrowers' to='/borrowers' />
      <MenuItem title='My Tasks' to='/my-tasks' />
      <MenuItem title='Transactions' to='/transactions' />
    </>
  )
}
