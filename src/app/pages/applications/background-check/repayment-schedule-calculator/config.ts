export const REPAYMENT_SHEDULE_CALCULATOR_CONFIG = {
  endpoint: 'config/company/1',
  rows: [
    {
      key: 'totalsAmount',
      name: 'Amount of Loan $',
      type: 'number',
      noThereAreCommas: false,
      require: true,
    },
    {
      key: 'per_month_percent',
      type: 'number',
      name: 'Interest per Month %',
      require: true,
      noThereAreCommas: false,
    },
    {
      key: 'totalsMonthPayment',
      name: 'No. of Instalment',
      type: 'number',
      noThereAreCommas: true,
      require: true,
    },
    {
      key: 'first_repayment_date',
      name: 'First Repayment Date',
      type: 'time',
      require: true,
    },
    {
      key: 'monthly_due_date',
      name: 'Monthly Due Date',
      type: 'text',
      require: true,
    },
  ],
}
