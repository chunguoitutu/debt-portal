import {TableConfig} from '../../../modules/auth'

export const ROLE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/job_type',
    endPointGetListing: '/config/job_type',
    messageDeleteSuccess: 'Job type successfully deleted',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'job_type_name',
      name: 'Job Type',
    },
    {
      key: 'description',
      name: 'Description',
    },
    {
      key: 'request_more_information',
      name: 'Need More Information',
    },
    {
      key: 'status',
      name: 'Status',
    },
  ],
}
