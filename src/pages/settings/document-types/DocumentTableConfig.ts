import {TableConfig} from '../../../app/types/common'
import Badge from '../../../components/badge/Badge'

export const DOCUMENT_TABLE_CONFIG: TableConfig = {
  endpoint: 'config/document_type',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/document_type',
    endPointGetListing: '/config/document_type',
    messageDeleteSuccess: 'Document Type /%/ successfully deleted',
    buttonAddNew: 'New Document',
    showMessageTitle: 'type_name',
  },
  rows: [
    {
      classNameTableHead: 'min-w-70px',
      key: 'id',
      name: 'ID',
    },
    {
      classNameTableHead: 'min-w-200px',
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
      classNameTableHead: 'w-50 min-w-200px',
      classNameTableBody: 'four-line',
      key: 'description',
      name: 'Description',
    },
    {
      classNameTableHead: 'min-w-200px',
      key: 'status',
      name: 'Status',
      component: Badge,
    },
    {
      classNameTableHead: 'min-w-200px align-items-center',
      key: 'created_date',
      name: 'Created Date',
    },
    {
      classNameTableHead: 'min-w-200px  align-items-center',
      key: 'updated_date',
      name: 'Updated Date',
      type: 'datetime',
    },
  ],
}
