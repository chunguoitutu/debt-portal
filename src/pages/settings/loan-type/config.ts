import {TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'

export const LOAN_TYPE_TABLE_CONFIG: TableConfig = {
  endpoint: 'config/loan_type',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/loan_type',
    endPointGetListing: '/config/loan_type',
    messageDeleteSuccess: 'Loan Type "/%/" successfully deleted',
    buttonAddNew: 'New Loan Type',
    showMessageTitle: 'type_name',
  },
  rows: [
    {
      classNameTableHead: 'w-50px w-90px',
      key: 'id',
      name: 'ID',
    },
    {
      classNameTableHead: 'w-200px',
      key: 'type_name',
      color: '#252F4A',
      name: 'Loan Type',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      classNameTableHead: 'w-200px',
      key: 'interest',
      color: '#252F4A',
      name: 'Default Interest',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'number',
        isRequired: true,
      },
    },
    {
      classNameTableHead: 'w-50 w-200px',
      classNameTableBody: 'four-line',
      key: 'description',
      name: 'Description',
    },
    {
      classNameTableHead: 'w-200px text-center',
      key: 'is_default',
      name: 'Default',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        subTextWhenChecked: 'Yes',
        subTextWhenNoChecked: 'No',
      },
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
