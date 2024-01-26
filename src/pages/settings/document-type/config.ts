import {DocumentTypeItem, TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'
import * as Yup from 'yup'

export const DOCUMENT_TABLE_CONFIG: TableConfig<keyof DocumentTypeItem> = {
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
    endpoint: 'config/document_type',
    validation: Yup.object().shape({
      type_name: Yup.string()
        .trim()
        .required('Document Type is required')
        .max(255, 'Document Type must be at most 255 characters'),
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
      classNameTableHead: 'w-200px min-w-175px',
      key: 'type_name',
      name: 'Document Type',
      color: '#252F4A',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
        required: true,
      },
    },
    {
      classNameTableHead: 'w-200px  min-w-175px',
      classNameTableBody: 'four-line',
      key: 'description',
      name: 'Description',
      infoCreateEdit: {
        typeComponent: 'textarea',
      },
    },

    {
      classNameTableHead: 'w-200px align-items-center min-w-150px text-end',
      classNameTableBody: 'text-end',
      key: 'created_date',
      name: 'Created Date',
      format: 'date',
    },
    {
      classNameTableHead: 'w-200px align-items-center min-w-150px text-end',
      classNameTableBody: 'text-end',
      key: 'updated_date',
      name: 'Updated Date',
      format: 'date',
    },
    {
      classNameTableHead: 'w-200px text-center min-w-150px',
      key: 'is_default',
      name: 'Default',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        subTextWhenChecked: 'Yes',
        subTextWhenNoChecked: 'No',
        defaultValue: 0,
        className: 'w-fit-content',
      },
    },
    {
      classNameTableHead: 'w-200px min-w-150px',
      key: 'status',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        defaultValue: 1,
        className: 'w-fit-content',
      },
    },
  ],
}
