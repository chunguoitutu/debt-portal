import {useEffect, useMemo, useState} from 'react'
import {Accordion} from 'react-bootstrap'
import {NavLink, useLocation} from 'react-router-dom'
import {useAuth} from '../../app/modules/auth'
import {v4 as uuidv4} from 'uuid'

type MenuItem = {
  activeKey: string
  title: string
  priority: number[]
  children: MenuChildren[]
}

type MenuChildren = {
  id: string
  to: string
  label: string
}

const SettingMenu = () => {
  const [activeKey, setActiveKey] = useState<string>('')

  const {pathname} = useLocation()
  const {priority} = useAuth()

  const MENU_LIST: MenuItem[] = useMemo(() => {
    return [
      {
        activeKey: uuidv4(),
        title: 'Company Management',
        priority: [1],
        children: [
          {
            id: uuidv4(),
            to: '/settings/company-management',
            label: 'Company Information',
          },
        ],
      },
      {
        activeKey: uuidv4(),
        title: 'User Management',
        priority: [1, 2],
        children: [
          {
            id: uuidv4(),
            to: '/settings/users',
            label: 'User Listing',
          },
        ],
      },
      {
        activeKey: uuidv4(),
        title: 'Listing',
        priority: [1],
        children: [
          {
            id: uuidv4(),
            to: '/settings/companies',
            label: 'Companies',
          },
          {
            id: uuidv4(),
            to: '/settings/roles',
            label: 'Roles',
          },
          {
            id: uuidv4(),
            to: '/settings/document-type',
            label: 'Document Type',
          },
          {
            id: uuidv4(),
            to: '/settings/loan-type',
            label: 'Loan Type',
          },
          {
            id: uuidv4(),
            to: '/settings/job-type',
            label: 'Job Type',
          },
          {
            id: uuidv4(),
            to: '/settings/address-type',
            label: 'Address Type',
          },
          {
            id: uuidv4(),
            to: '/settings/marketing-type',
            label: 'Marketing Type',
          },
          {
            id: uuidv4(),
            to: '/settings/rejection-type',
            label: 'Rejection Type',
          },
        ],
      },
      {
        activeKey: uuidv4(),
        title: 'Settings',
        priority: [1],
        children: [
          {
            id: uuidv4(),
            to: '/settings/other',
            label: 'Config',
          },
        ],
      },
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!priority) return

    const currentMenuItemActive = MENU_LIST.filter((menu) =>
      menu.children.find((item) => item.to === pathname)
    )

    if (!currentMenuItemActive.length) return

    const currentActiveKey = currentMenuItemActive[0].activeKey
    setActiveKey(currentActiveKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MENU_LIST])

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
        {MENU_LIST.filter((item) => item.priority.includes(priority)).map((menu, index) => {
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
        })}
      </Accordion>
    </div>
  )
}

export default SettingMenu
