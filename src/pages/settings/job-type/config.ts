import {TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'

export const JOB_TABLE_CONFIG: TableConfig = {
  endpoint: 'config/job_type',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/job_type',
    endPointGetListing: '/config/job_type',
    messageDeleteSuccess: 'Job type "/%/" successfully deleted',
    buttonAddNew: 'New Job',
    showMessageTitle: 'job_type_name',
  },
  rows: [
    {
      classNameTableHead: 'min-w-70px',
      key: 'id',
      name: 'ID',
    },
    {
      classNameTableHead: 'min-w-300px',
      key: 'job_type_name',
      name: 'Job Type',
      color: '#252F4A',
      infoCreateEdit: {
        type: 'input',
        typeInput: 'text',
        isRequired: true,
      },
    },
    {
      classNameTableHead: 'w-50 min-w-300px',
      classNameTableBody: 'four-line',
      key: 'description',
      name: 'Description',
    },
    // {
    //   classNameTableHead: 'w-50 min-w-70px',
    //   key: 'request_more_information',
    //   name: 'Need More Information',
    // },
    {
      classNameTableHead: 'w-50 min-w-70px',
      key: 'request_more_information',
      name: 'Need More Information',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        subTextWhenChecked: 'Yes',
        subTextWhenNoChecked: 'No',
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
      classNameTableHead: 'min-w-200px',
      key: 'status',
      name: 'Status',
      component: Badge,
    },
  ],
}
