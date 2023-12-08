import {TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'

export const DOCUMENT_TABLE_CONFIG: TableConfig = {
  endpoint: 'config/document_type',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/document_type',
    endPointGetListing: '/config/document_type',
    messageDeleteSuccess: 'Document Type "/%/" successfully deleted',
    buttonAddNew: 'New Document',
    showMessageTitle: 'type_name',
  },
  rows: [
    {
      classNameTableHead: 'w-70px',
      key: 'id',
      name: 'ID',
    },
    {
      classNameTableHead: 'w-200px',
      key: 'type_name',
      name: 'Document Type',
      color: '#252F4A',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
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
      classNameTableHead: 'w-200px align-items-center',
      key: 'created_date',
      name: 'Created Date',
    },
    {
      classNameTableHead: 'w-200px align-items-center',
      key: 'updated_date',
      name: 'Updated Date',
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
      classNameTableHead: 'w-200px',
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
