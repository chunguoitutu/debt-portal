import Badge from '../../../components/badge/Badge'
import Checkbox from '../../../components/checkbox/Checkbox'
import {TableConfig} from '../../../modules/auth'

export const APPLICATION_LISTING_CONFIG: TableConfig = {
  endpoint: '',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointGetListing: '/application/listing',
    showFilter: true,
    showSearch: true,
  },
  rows: [
    {
      key: 'id',
      name: '',
      component: Checkbox,
    },
    {
      key: 'application_no',
      name: 'Application Number',
    },
    {
      key: 'fullname',
      name: 'APPLICATION NAME',
    },
    {
      key: 'identification_type',
      name: 'ID TYPE',
    },
    {
      key: 'loan_type',
      name: 'LOAN TYPE',
    },
    {
      key: 'loan_amount_requested',
      name: 'LOAN AMOUNT REQUIRED',
    },
    {
      key: 'application_date',
      name: 'APPLICATION DATE',
    },
    {
      key: 'status',
      name: 'STATUS',
      component: Badge,
    },
  ],
}
