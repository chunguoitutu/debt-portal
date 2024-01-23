import { InstalmentSchedule, PayloadRepaymentSchedule } from '@/app/types/calculate'
import { MONTHLY_DUE_DATE, TERM_UNIT, getDaysOfCurrentDate } from '@/app/utils'
import moment from 'moment'

export const REPAYMENT_SCHEDULE_CALCULATOR_CONFIG: {
  endpoint: string
  rows: {
    key: keyof PayloadRepaymentSchedule
    name: string
    type: 'number' | 'date' | 'text'
    noThereAreCommas?: boolean
    require: boolean
    typeComponent: 'input' | 'select'
    defaultValue?: any
    options?: any[]
  }[]
} = {
  endpoint: 'config/company/1',
  rows: [
    {
      key: 'loan_amount',
      name: 'Amount of Loan $',
      type: 'number',
      noThereAreCommas: false,
      require: true,
      typeComponent: 'input',
    },
    {
      key: 'term_unit',
      name: 'Term Unit',
      type: 'text',
      require: true,
      typeComponent: 'select',
      options: TERM_UNIT,
      defaultValue: TERM_UNIT[0].value,
    },
    {
      key: 'total_cycle',
      name: 'No. of Instalment',
      type: 'number',
      noThereAreCommas: true,
      require: true,
      typeComponent: 'input',
      defaultValue: 1,
    },
    {
      key: 'interest_percent',
      type: 'number',
      name: 'Interest %',
      require: true,
      noThereAreCommas: false,
      typeComponent: 'input',
      defaultValue: 4,
    },
    {
      key: 'first_repayment_date',
      name: 'First Repayment Date',
      type: 'date',
      require: true,
      typeComponent: 'input',
      defaultValue: moment(new Date()).format('YYYY-MM-DD'),
    },

    {
      key: 'monthly_due_date',
      name: 'Monthly Due Date',
      type: 'text',
      require: true,
      typeComponent: 'select',
      options: MONTHLY_DUE_DATE,
      defaultValue: getDaysOfCurrentDate(),
    },
  ],
}

export const REPAYMENT_SCHEDULE_TABLES: {
  rows: {
    key: keyof InstalmentSchedule | 'amount_emi'
    name: string
  }[]
} = {
  rows: [
    {
      key: 'date',
      name: 'Date',
    },
    {
      key: 'principal',
      name: 'Principal Repayment',
    },
    {
      key: 'interest',
      name: 'Interest Repayment',
    },
    {
      key: 'amount_emi',
      name: 'Total Repayment (EMI)',
    },
    {
      key: 'amount_balance',
      name: 'Principal Balance',
    },
  ],
}
