import { TableConfig } from '@/app/types'

export const CREATE_APPLICATION_PORTAL_CONFIG: TableConfig<any> = {
    settings: {

    },
    rows: [
        {
            key: 'fullname',
            name: 'Name',
            infoCreateEdit: {
                typeComponent: 'input',
                type: 'text',
                column: 6,
                columnMobile: 12,
            },
        },
        {
            key: 'identification_no',
            name: 'NRIC',
            infoCreateEdit: {
                typeComponent: 'input',
                type: 'text',
                column: 6,
                columnMobile: 12,
            },
        },
    ],
}
