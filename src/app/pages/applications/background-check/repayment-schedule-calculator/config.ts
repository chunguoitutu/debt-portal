export const REPAYMENT_SHEDULE_CALCULATOR_CONFIG = {
  endpoint: 'config/company/1',
  rows: [
    {
      key: 'totalsAmount',
      name: 'Amount of Loan $',
      type: 'number',
      noThereAreCommas: false,
      require: true,
      typeText: 'input',
    },
    {
      key: 'per_month_percent',
      type: 'number',
      name: 'Interest per Month %',
      require: true,
      noThereAreCommas: false,
      typeText: 'input',
    },
    {
      key: 'totalsMonthPayment',
      name: 'No. of Instalment',
      type: 'number',
      noThereAreCommas: true,
      require: true,
      typeText: 'input',
    },
    {
      key: 'first_repayment_date',
      name: 'First Repayment Date',
      type: 'time',
      require: true,
      typeText: 'inputTime',
    },
    {
      key: 'monthly_due_date',
      name: 'Monthly Due Date',
      type: 'text',
      require: true,
      typeText: 'select',
    },
  ],
}

export const REPAYMENT_SHEDULE_TABLES = {
  rows: [
    {
      key: 'instalment_due_date',
      name: 'Date',
    },
    {
      key: 'principal_per_month',
      name: 'Principal Repayment',
    },
    {
      key: 'interest_per_month',
      name: 'Interest Repayment',
    },
    {
      key: 'monthly_inst_amount',
      name: 'Total Repayment',
    },
    {
      key: 'balance_principal',
      name: 'Principal Balance',
    },
  ],
}
