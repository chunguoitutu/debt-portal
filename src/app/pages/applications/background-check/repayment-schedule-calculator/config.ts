export const REPAYMENT_SHEDULE_CALCULATOR_CONFIG = {
  endpoint: 'config/company/1',
  rows: [
    {
      key: 'amount_of_loan',
      name: 'Amount of Loan $',
      type: 'number',
      noThereAreCommas: true,
      require: true,
    },
    {
      key: 'interest_per_month',
      type: 'number',
      name: 'Interest per Month %',
      require: true,
      noThereAreCommas: true,
    },
    {
      key: 'no_of_instalment',
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
