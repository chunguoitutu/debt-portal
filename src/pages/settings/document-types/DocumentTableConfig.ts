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
      key: 'id',
      name: 'ID',
    },
    {
      key: 'type_name',
      name: 'Document Type',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      key: 'description',
      name: 'Description',
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
    {
      key: 'created_date',
      name: 'Created Date',
    },
    {
      key: 'updated_date',
      name: 'Updated Date',
      type: 'datetime',
    },
  ],
}
