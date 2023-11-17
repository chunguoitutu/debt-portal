import {TableConfig} from '../../../app/types/common'
import Badge from '../../../components/badge/Badge'

export const JOB_TABLE_CONFIG: TableConfig = {
  endpoint: 'config/job_type',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/job_type',
    endPointGetListing: '/config/job_type',
    messageDeleteSuccess: 'Job type /%/ successfully deleted',
    buttonAddNew: 'New Job',
    showMessageTitle: 'job_type_name',
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'job_type_name',
      name: 'Job Type',
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
      key: 'request_more_information',
      name: 'Need More Information',
      type: 'yes/no',
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
