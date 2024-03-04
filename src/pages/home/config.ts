import {HomeComponent} from '@/app/types/home'
import HomeHeader from './Header'
import Introduce from './Introduce'
import FinancialInstitutions from './FinancialInstitutions'
import Team from './Team'
import AboutUs from './AboutUs'

export const COMPONENT_LIST: HomeComponent[] = [
  {
    id: 1,
    component: HomeHeader,
  },
  // {
  //   id: 2,
  //   component: Introduce,
  // },
  // {
  //   id: 3,
  //   component: FinancialInstitutions,
  // },
  // {
  //   id: 4,
  //   component: Team,
  // },
  // {
  //   id: 5,
  //   component: AboutUs,
  // },
]

export const INTRODUCE_LIST = [
  {
    className: 'bg-black',
    label: 'Mission',
    content:
      'To offer rigorously-researched strategic advice and offer our clients a distinct competitive advantage. To deliver innovative investment opportunities that provide long-lasting value and consistent returns for our investors.',
  },
  {
    className: 'bg-blue',
    label: 'Values',
    content:
      'Our values are characterised by the MCK Group brand mark: a majestic blue eagle. Soaring above and beyond, the MCK eagle is a born leader with integrity, courage and strength. Fully independent, with unparalleled vision and precision timing, these strong values help MCK Group achieve business excellence and deliver for our investors every single day.',
  },
  {
    className: 'bg-blue-medium',
    label: 'Vision',
    content:
      "To be Singapore's leading investment management company and become a premium global conglomerate, offering innovative, market-leading products and services.",
  },
]
