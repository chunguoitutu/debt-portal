import { TableConfig } from '@/app/types'
import { ID_TYPE, STATUS_APPLICATION_FILTER } from '@/app/utils'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

export const APPLICATION_LISTING_CONFIG_DASHBOARD: TableConfig = {
    endpoint: '',
    settings: {
        showAction: true,
        showEditButton: true,
        showDeleteButton: true,
        showViewButton: true,
        endPointGetListing: '/application/listing',
        showFilter: true,
        showSearch: true,
    },
    rows: [
        {
            key: 'id',
            name: 'ID',
            classNameTableHead: 'ps-5',
            classNameTableBody: 'w-50px ps-3',
        },
        {
            key: 'application_no',
            name: 'Application No',
            infoFilter: {
                typeComponent: 'input',
                component: Input,
                isSort: true,
            },
        },
        {
            key: 'fullname',
            name: 'Name of Borrower',
            infoFilter: {
                typeComponent: 'input',
                component: Input,
                isSort: true,
            },
        },

        {
            key: 'status',
            name: 'Status',
            classNameTableBody: 'text-center',
            classNameTableHead: 'text-center pe-3',
            options: STATUS_APPLICATION_FILTER,
            infoFilter: {
                typeComponent: 'select',
                component: Select,
                isSort: true,
            },
        },
    ],
}
