import {MarketingTypeItem, TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'
import * as Yup from 'yup'

export const MARKETING_TABLE_CONFIG: TableConfig<keyof MarketingTypeItem> = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/marketing_type',
    endPointGetListing: '/config/marketing_type',
    messageDeleteSuccess: 'Marketing Type "/%/" successfully deleted',
    showMessageTitle: 'marketing_type_name',
    buttonAddNew: 'New Marketing Type',
    endpoint: 'config/marketing_type',
    swalToastTitle: 'Marketing Type "/%/" successfully',
    validation: Yup.object().shape({
      marketing_type_name: Yup.string()
        .required('Marketing Type is required')
        .trim()
        .max(255, 'Marketing Type must be at most 255 characters'),
    }),
  },
  rows: [
    {
      classNameTableHead: 'w-90px min-w-20px',
      key: 'id',
      name: 'ID',
    },
    {
      key: 'marketing_type_name',
      name: 'Marketing Type',
      color: '#252F4A',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
        required: true,
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
        component: CheckboxRounded,
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
        component: CheckboxRounded,
        defaultValue: 1,
      },
    },
  ],
}
