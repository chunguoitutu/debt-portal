import clsx from 'clsx'
import Button from '../button/Button'

type Props = {
  toggleFormLogin: () => void
}
const LogInHeader = ({toggleFormLogin}: Props) => {
  return (
    <div className={clsx(['d-flex align-items-center gap-16px gap-sm-16px'])}>
      <Button className='border border-primary text-info-light bg-hover-primary fs-14'>
        Login With Singpass
      </Button>
      <Button className='btn-primary fs-14' onClick={toggleFormLogin}>
        Sign In
      </Button>
    </div>
  )
}

export default LogInHeader
