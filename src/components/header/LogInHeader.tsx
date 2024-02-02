import clsx from 'clsx'
import Button from '../button/Button'

type Props = {
  toggleFormLogin: () => void
}
const LogInHeader = ({toggleFormLogin}: Props) => {
  return (
    <div className={clsx(['d-flex align-items-center gap-8px gap-sm-16px'])}>
      <Button className='border border-primary text-info-light bg-hover-primary'>
        Login With Singpass
      </Button>
      <Button onClick={toggleFormLogin}>Login</Button>
    </div>
  )
}

export default LogInHeader
