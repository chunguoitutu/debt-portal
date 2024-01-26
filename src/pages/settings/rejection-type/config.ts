import {TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import * as Yup from 'yup'

export const REJECTION_TYPE_TABLE_CONFIG: TableConfig = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/rejection_type',
    endPointGetListing: '/config/rejection_type',
    messageDeleteSuccess: 'Rejection Type "/%/" successfully deleted',
    buttonAddNew: 'New Rejection Type',
    endpoint: 'config/rejection_type',
    showMessageTitle: 'rejection_type_name',
    swalToastTitle: 'Rejection Type "/%/" successfully',
    validation: Yup.object().shape({
      rejection_type_name: Yup.string()
        .trim()
        .required('Rejection Type is required')
        .max(255, 'Rejection Type must be at most 255 characters'),
      rejection_type_code: Yup.string()
        .trim()
        .required('Code is required')
        .max(64, 'Code must be at most 64 characters'),
      description: Yup.string().trim().max(1024, 'Description must be at most 1024 characters'),
    }),
  },
  rows: [
    {
      classNameTableHead: 'min-w-40px',
      key: 'id',
      name: 'ID',
    },
    {
      key: 'rejection_type_name',
      color: '#252F4A',
      name: 'Rejection Type',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
        required: true,
      },
    },
    {
      classNameTableHead: 'min-w-75px w-150px',
      key: 'rejection_type_code',
      name: 'Code',

      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
        required: true,
      },
    },
    {
      key: 'rejection_type_description',
      name: 'Description',
      classNameTableHead: 'w-400px min-w-150px',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
      },
    },
    {
      classNameTableHead: 'w-200px text-center',
      key: 'is_default',
      name: 'Default',
      component: Badge,
      infoCreateEdit: {
        className: 'w-fit-content',
        typeComponent: 'checkbox-rounded',
        subTextWhenChecked: 'Yes',
        subTextWhenNoChecked: 'No',
        defaultValue: 0,
      },
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        className: 'w-fit-content',
        typeComponent: 'checkbox-rounded',
        defaultValue: 1,
      },
    },
  ],
}
