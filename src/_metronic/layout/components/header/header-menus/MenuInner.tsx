import {MenuItem} from './MenuItem'

export function MenuInner() {
  return (
    <>
      <MenuItem hasDropdown={true} title='Applications' to='/application' />
      <MenuItem title='Loans' to='/loans' />
      <MenuItem title='Customers' to='/customers' />
      <MenuItem title='My Tasks' to='/my-tasks' />
      <MenuItem title='Transactions' to='/transactions' />
    </>
  )
}
