import {TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'

export const REJECTION_TYPE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/rejection_type',
    endPointGetListing: '/config/rejection_type',
    messageDeleteSuccess: 'Rejection Type "/%/" successfully deleted',
    buttonAddNew: 'New Rejection Type',
    endpoint: 'config/rejection_type',
    showMessageTitle: 'rejection_type_name',
    swalToastTitle: 'Rejection Type "/%/" successfully',
  },
  rows: [
    {
      classNameTableHead: 'min-w-40px',
      key: 'id',
      name: 'ID',
    },
    {
      key: 'rejection_type_name',
      color: '#252F4A',
      name: 'Rejection Type',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      classNameTableHead: 'min-w-75px w-150px',
      key: 'rejection_type_code',
      name: 'Code',

      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'rejection_type_description',
      name: 'Description',
      classNameTableHead: 'w-400px min-w-150px',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
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
