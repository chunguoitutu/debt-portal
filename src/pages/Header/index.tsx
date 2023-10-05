import { Outlet } from "react-router-dom"

const Header = () => {
  return (
    <>
    <div>Main Layout</div>
    <Outlet />
    </>
  )
}

export default Header