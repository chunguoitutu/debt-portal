import {StepItem} from '../modules/auth'
import Completion from '../pages/applications/step-component/completion'
import BankInfo from '../pages/applications/step-component/bank-info/BankInfo'
import {
  BANK_INFO_CONFIG,
  COMPLETION_CONFIG,
  CONTACT_INFORMATION,
  EMPLOYMENT_CONFIG,
  GENERAL_INFORMATION_CONFIG,
  LOAN_DETAILS_CONFIG,
} from '../pages/applications/step-component/config'
import ContactInformation from '../pages/applications/step-component/contact-information/ContactInformation'
import Employment from '../pages/applications/step-component/employment/Employment'
import GeneralInformation from '../pages/applications/step-component/general-information/GeneralInformation'
import LoanDetails from '../pages/applications/step-component/loan-details/LoanDetails'

export const STEP_APPLICATION: StepItem[] = [
  {
    label: 'Personal Information',
    component: GeneralInformation,
    config: GENERAL_INFORMATION_CONFIG,
  },
  {
    label: 'Loan Details',
    component: LoanDetails,
    config: LOAN_DETAILS_CONFIG,
  },
  {
    label: 'Contact Information',
    component: ContactInformation,
    config: CONTACT_INFORMATION,
  },
  {
    label: 'Employment',
    component: Employment,
    config: EMPLOYMENT_CONFIG,
  },
  {
    label: 'Bank Information',
    component: BankInfo,
    config: BANK_INFO_CONFIG,
  },
  {
    label: 'Completion',
    desc: 'Review & Save Application.',
    component: Completion,
    config: COMPLETION_CONFIG,
  },
]

export const STEP_REPAYMENT_SCHEDULE_CALCULATOR: StepItem[] = [
  {
    label: 'Schedule Calculator',
    desc: 'General information of loan application.',
  },
  {
    label: 'Completed',
    desc: 'Result of calculating debt repayment schedule.',
  },
]
