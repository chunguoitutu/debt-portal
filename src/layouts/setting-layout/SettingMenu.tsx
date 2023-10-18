import {useEffect, useState} from 'react'
import {Accordion} from 'react-bootstrap'
import {NavLink, useLocation} from 'react-router-dom'
import {useAuth} from '../../app/modules/auth'
import {MENU_SETTING_LISTING} from '../../app/utils/globalConfig'

const SettingMenu = () => {
  const [activeKey, setActiveKey] = useState<string>('')

  const {pathname} = useLocation()
  const {priority} = useAuth()

  useEffect(() => {
    if (!priority) return

    const currentMenuItemActive = MENU_SETTING_LISTING.filter((menu) =>
      menu.children.find((item) => item.to === pathname)
    )

    if (!currentMenuItemActive.length) return

    const currentActiveKey = currentMenuItemActive[0].activeKey
    setActiveKey(currentActiveKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      >
        {MENU_SETTING_LISTING.filter((item) => item.priority.includes(priority)).map(
          (menu, index) => {
            return (
              <Accordion.Item eventKey={menu.activeKey} key={index}>
                <Accordion.Header>{menu.title}</Accordion.Header>
                <Accordion.Body>
                  {menu.children.map((item) => {
                    return (
                      <NavLink
                        key={item.id}
                        className={({isActive}) =>
                          'd-block nav-link text-hover-primary text-active-primary' +
                          (isActive ? ' active' : '')
                        }
                        to={item.to}
                      >
                        {item.label}
                      </NavLink>
                    )
                  })}
                </Accordion.Body>
              </Accordion.Item>
            )
          }
        )}
      </Accordion>
    </div>
  )
}

export default SettingMenu
