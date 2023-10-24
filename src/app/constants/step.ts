import {StepItem} from '../modules/auth'

export const STEP_APPLICATION: StepItem[] = [
  {
    label: 'Application Details',
    desc: 'General Information Of Loan Application.',
  },
  {
    label: 'Applicant Details',
    desc: 'Detailed Customer Contact Information.',
  },
  {
    label: 'Workplace',
    desc: 'Customer Workplace Information.',
  },
  {
    label: 'Bank Information',
    desc: 'Customer Bank Information.',
  },
  {
    label: 'Loan Application',
    desc: 'Detailed Customer Loan Application.',
  },
  {
    label: 'Guarantor',
    desc: 'Detailed Customer Loan Application.',
  },
  {
    label: 'Complete',
    desc: 'Review & Save Application.',
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
