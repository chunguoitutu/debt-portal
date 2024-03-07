import AllIcon from '@/app/images/all.svg?react'
import TodoIcon from '@/app/images/to-do.svg?react'
import DoneIcon from '@/app/images/done.svg?react'
import StatisticalIcon from '@/app/images/statistical.svg?react'
import ProfileIcon from '@/app/images/profile.svg?react'

export const DEBT_MENU = [
  {
    id: 1,
    label: 'All',
    icon: AllIcon,
    default: true,
    path: '/debt',
  },
  {
    id: 2,
    label: 'To Do List',
    icon: TodoIcon,
    path: '/debt/todo',
  },
  {
    id: 3,
    label: 'Done',
    icon: DoneIcon,
    path: '/debt/done',
  },
  {
    id: 4,
    label: 'Statistical',
    icon: StatisticalIcon,
    path: '/debt/statistical',
  },
  {
    id: 5,
    label: 'Profile',
    icon: ProfileIcon,
    path: '/debt/profile',
  },
]
