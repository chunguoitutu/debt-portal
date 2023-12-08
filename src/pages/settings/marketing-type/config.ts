import {TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'

export const MAKETTING_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/marketing_type',
    endPointGetListing: '/config/marketing_type',
    messageDeleteSuccess: 'Marketing Type "/%/" successfully deleted',
    showMessageTitle: 'marketing_type_name',
    buttonAddNew: 'New Marketing Type',
    endpoint: 'config/marketing_type',
    swalToastTitle: 'Marketing Type "/%/" successfully',
  },
  rows: [
    {
      classNameTableHead: 'w-90px min-w-20px',

      key: 'id',

      name: 'ID',
    },
    {
      key: 'marketing_type_name',
      name: 'Marketing Type',
      color: '#252F4A',
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
