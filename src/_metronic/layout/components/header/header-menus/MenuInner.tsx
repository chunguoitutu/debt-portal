import {MenuItem} from './MenuItem'

export function MenuInner() {
  return (
    <>
      <MenuItem title={'Applications'} to='/applications' />
      <MenuItem title='Loans' to='/loans' />
      <MenuItem title='Borrowers' to='/borrowers' />
      <MenuItem title='My Tasks' to='/my-tasks' />
      <MenuItem title='Transactions' to='/transactions' />
    </>
  )
}
