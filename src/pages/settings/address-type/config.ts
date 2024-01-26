import {AddressTypeItem, TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'
import * as Yup from 'yup'

export const ADDRESS_TABLE_CONFIG: TableConfig<keyof AddressTypeItem> = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/address_type',
    endPointGetListing: '/config/address_type',
    messageDeleteSuccess: 'Address Type "/%/" successfully deleted',
    buttonAddNew: 'New Address',
    endpoint: 'config/address_type',
    showMessageTitle: 'address_type_name',
    swalToastTitle: 'Address Type "/%/" successfully',
    validation: Yup.object().shape({
      address_type_name: Yup.string()
        .trim()
        .required('Address Type is required')
        .max(255, 'Address Type must be at most 255 characters'),
      description: Yup.string().trim().max(1024, 'Description must be at most 1024 characters'),
    }),
  },
  rows: [
    {
      classNameTableHead: 'min-w-20px',
      key: 'id',
      name: 'ID',
    },

    {
      key: 'address_type_name',
      name: 'Address Type',
      color: '#252F4A',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
        required: true,
      },
    },
    {
      key: 'description',
      name: 'Description',
      classNameTableHead: 'w-600px min-w-150px',
      classNameTableBody: 'four-line',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
      },
    },
    // {
    //   classNameTableHead: 'w-200px text-center',
    //   key: 'is_default',
    //   name: 'Default',
    //   component: Badge,
    //   infoCreateEdit: {
    //     typeComponent: 'checkbox-rounded',
    //     component: CheckboxRounded,
    //     subTextWhenChecked: 'Yes',
    //     subTextWhenNoChecked: 'No',
    //   },
    // },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        defaultValue: 1,
      },
    },
  ],
}
