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
    endPointGetListing: '',
    buttonAddNew: 'New Application',
    showFilter: true,
    showSearch: true,
  },
  rows: [
    {
      key: 'id',
      name: 'Checkbox',
      component: Checkbox
    },
    {
      key: 'application_id',
      name: 'Application Number',
    },
    {
      key: 'application_name',
      name: 'APPLICATION NAME',
    },
    {
      key: 'id_type',
      name: 'ID TYPE',
    },
    {
      key: 'loan_type',
      name: 'LOAN TYPE',
    },
    {
      key: 'loan_amount_required',
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
