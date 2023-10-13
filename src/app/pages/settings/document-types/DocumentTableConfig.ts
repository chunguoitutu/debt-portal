import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const DOCUMENT_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/document_type',
    endPointGetListing: '/config/document_type',
    messageDeleteSuccess: 'Document Type successfully deleted',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'type_name',
      name: 'Document Type',
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
