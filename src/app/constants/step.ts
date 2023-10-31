import {StepItem} from '../modules/auth'
import BankInfo from '../pages/applications/step-component/bank-info/BankInfo'
import {
  BANK_INFO_CONFIG,
  CONTRACT_INFORMATION,
  GENERAL_INFORMATION_CONFIG,
  LOAN_DETAILS_CONFIG,
} from '../pages/applications/step-component/config'
import ContactInformation from '../pages/applications/step-component/contract-information/ContactInformation'
import GeneralInformation from '../pages/applications/step-component/general-information/GeneralInformation'
import LoanDetails from '../pages/applications/step-component/loan-details/LoanDetails'

export const STEP_APPLICATION: StepItem[] = [
  {
    label: 'Application Details',
    desc: 'General Information Of Loan Application.',
    component: GeneralInformation,
    config: GENERAL_INFORMATION_CONFIG,
  },
  {
    label: 'Loan Details',
    desc: 'Detailed Customer Contact Information.',
    component: LoanDetails,
    config: LOAN_DETAILS_CONFIG,
  },
  {
    label: 'Workplace',
    desc: 'Customer Workplace Information.',
    component: ContactInformation,
    config: CONTRACT_INFORMATION,
  },
  {
    label: 'Bank Information',
    desc: 'Customer Bank Information.',
    component: BankInfo,
    config: BANK_INFO_CONFIG,
  },
  {
    label: 'Loan Application',
    desc: 'Detailed Customer Loan Application.',
    component: GeneralInformation,
    config: GENERAL_INFORMATION_CONFIG,
  },
  {
    label: 'Guarantor',
    desc: 'Detailed Customer Loan Application.',
    component: GeneralInformation,
    config: GENERAL_INFORMATION_CONFIG,
  },
  {
    label: 'Complete',
    desc: 'Review & Save Application.',
    component: GeneralInformation,
    config: GENERAL_INFORMATION_CONFIG,
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
