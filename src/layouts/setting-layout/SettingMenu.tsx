import {useEffect, useState} from 'react'
import {Accordion} from 'react-bootstrap'
import {NavLink, useLocation} from 'react-router-dom'
import {useAuth} from '../../app/context/AuthContext'

const SettingMenu = () => {
  const [activeKey, setActiveKey] = useState<string>('')

  const {pathname} = useLocation()
  const {priority} = useAuth()

  // this page only show when you are admin or super admin
  if (!priority || priority > 2) return null

  function handleSelect(eventKey: any) {
    setActiveKey(eventKey)
  }

  return (
    <div className='card'>
      <Accordion
        className='p-10 card-body shadow-none bg-transparent'
        activeKey={activeKey}
        onSelect={handleSelect}
      ></Accordion>
    </div>
  )
}

export default SettingMenu
