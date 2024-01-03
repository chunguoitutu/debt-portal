import {TableConfig} from '@/app/types'
import {GENDER, ID_TYPE, STATUS_APPLICATION_FILTER} from '@/app/utils'
import {Input} from '@/components/input'
import {Select} from '@/components/select'

export const BORROWER_CONFIG_LISTING: TableConfig = {
  endpoint: '',
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: true,
    endPointGetListing: '/borrower/listing',
    showFilter: true,
    showSearch: true,
  },
  rows: [
    {
      key: 'id',
      name: 'ID',
      classNameTableHead: 'ps-5',
      classNameTableBody: 'w-50px ps-5',
    },
    {
      key: 'customer_no',
      name: 'Customer No',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'fullname',
      name: 'Full Name',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },
    {
      key: 'identification_type',
      name: 'Identity Card Type',

      options: ID_TYPE,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
    {
      key: 'identification_no',
      name: 'NRIC No',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },

    {
      key: 'gender',
      name: 'Gender',
      classNameTableHead: 'ps-3',
      options: GENDER,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },

    {
      key: 'date_of_birth',
      name: 'Date Of Birth',
      classNameTableBody: 'pe-8 text-end',
      classNameTableHead: 'pe-8 text-end',
      infoFilter: {
        isFromTo: true,
        typeComponent: 'input',
        component: Input,
        typeInput: 'date',
        isSort: true,
      },
    },
    {
      key: 'mobilephone_1',
      name: 'Telephone',
      classNameTableHead: 'ps-20 ',
      infoFilter: {
        typeComponent: 'input',
        typeInput: 'phone',
        component: Input,
        isSort: true,
      },
    },
  ],
}
