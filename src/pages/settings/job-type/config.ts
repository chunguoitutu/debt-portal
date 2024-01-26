import {JobTypeItem, TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'
import * as Yup from 'yup'

export const JOB_TABLE_CONFIG: TableConfig<keyof JobTypeItem> = {
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
    endpoint: 'config/job_type',
    validation: Yup.object().shape({
      job_type_name: Yup.string()
        .trim()
        .required('Job Type is required')
        .max(255, 'Job Type must be at most 255 characters'),
      description: Yup.string().trim().max(1024, 'Description must be at most 1024 characters'),
    }),
  },
  rows: [
    {
      classNameTableHead: 'w-70px',
      key: 'id',
      name: 'ID',
    },
    {
      classNameTableHead: 'w-300px min-w-150px',
      key: 'job_type_name',
      name: 'Job Type',
      color: '#252F4A',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
        required: true,
      },
    },
    {
      classNameTableHead: 'w-300px min-w-150px',
      classNameTableBody: 'four-line',
      key: 'description',
      name: 'Description',
      infoCreateEdit: {
        typeComponent: 'textarea',
      },
    },
    // {
    //   classNameTableHead: 'w-50 w-70px',
    //   key: 'request_more_information',
    //   name: 'Need More Information',
    // },
    {
      classNameTableHead: 'w-70px',
      key: 'request_more_information',
      name: 'Need More Information',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        subTextWhenChecked: 'Yes',
        subTextWhenNoChecked: 'No',
        defaultValue: 0,
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
        className: 'w-fit-content',
        defaultValue: 0,
      },
    },
    {
      classNameTableHead: 'w-200px',
      key: 'status',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        className: 'w-fit-content',
        defaultValue: 1,
      },
    },
  ],
}
