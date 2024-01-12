import { TableConfig } from '@/app/types'
import { BLACKLIST_OPTION, EXCLUSION_OPTION, GENDER, ID_TYPE, STATUS_APPLICATION_FILTER, STATUS_CUSTOMER_LISTING } from '@/app/utils'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

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
      classNameTableHead: 'pt-2 pb-2 ps-5',
      classNameTableBody: 'w-50px ps-5',
    },
    {
      classNameTableHead: 'pt-2 pb-2 mw-250px',
      key: 'customer_no',
      name: 'Customer ID',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },

    {
      classNameTableHead: 'pt-2 pb-2 mw-250px ps-10',
      key: 'fullname',
      name: 'Name',
      infoFilter: {
        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },

    {
      classNameTableHead: 'pt-2 pb-2 ps-3 mw-250px',
      key: 'identification_no',
      name: 'NRIC No',
      infoFilter: {

        typeComponent: 'input',
        component: Input,
        isSort: true,
      },
    },

    {
      classNameTableHead: 'pt-2 pb-2 text-center ps-3 mw-175px',
      key: 'blacklisted',
      name: 'Blacklisted',
      options: BLACKLIST_OPTION,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },

    {
      key: 'exclusion',
      name: 'Exclusion',
      classNameTableBody: 'pe-8 text-end',
      classNameTableHead: 'pt-2 pb-2 pe-8 text-center mw-200px',
      options: EXCLUSION_OPTION,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
    {
      key: 'status',
      name: 'Status',
      classNameTableBody: 'text-center',
      classNameTableHead: 'text-center pt-2 pb-2 w-150px',
      options: STATUS_CUSTOMER_LISTING,
      infoFilter: {
        typeComponent: 'select',
        component: Select,
        isSort: true,
      },
    },
  ],
}
