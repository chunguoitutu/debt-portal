import Badge from '../../../components/badge/Badge'
import {TableConfig} from '../../../modules/auth'

export const JOB_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/job_type',
    endPointGetListing: '/config/job_type',
    messageDeleteSuccess: 'Job type successfully deleted',
    buttonAddNew: 'New Job',
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
      type: 'yes/no'
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
