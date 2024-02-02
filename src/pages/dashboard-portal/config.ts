import { TableConfig } from '@/app/types'
import { Input } from '@/components/input'
import { Badge } from 'react-bootstrap'

export const LOAN_CUSTOMER_PORTAL: TableConfig = {
    settings: {
        endPointGetListing: '/',
        endpointNavigate: '/my-loans/details',
        saveSESSION_NAME: 'recentlyViewedLoanId',
    },
    rows: [
        {
            key: 'id',
            name: '#',
            classNameTableHead: 'pt-8px'
        },
        {
            key: 'loan_no',
            name: 'Loan No',
            classNameTableBody: 'fw-bold'
        },
        {
            key: 'full_repayment_date',
            name: 'Full Repayment Date',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end fw-normal',
            format: 'date',
        },
        {
            key: 'total_collection',
            name: 'Total Collection',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end fw-normal',
            format: 'money',
        },
        {
            key: 'loan_amount',
            name: 'Loan Amount',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end fw-normal',
            format: 'money',
        },
        {
            key: 'status',
            name: 'Status',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end pe-1',
            component: Badge,
        },
    ],
}

export const LOAN_CUSTOMER_PORTAL_CARD_MOBILE: TableConfig = {
    settings: {
        endPointGetListing: '/',
        endpointNavigate: '/my-loans/details/1',
        saveSESSION_NAME: 'recentlyViewedLoanId',
    },
    rows: [
        {
            key: 'status',
            name: 'Status',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end pe-1',
            component: Badge,
        },
        {
            key: 'loan_no',
            name: 'Loan No',
            classNameTableBody: 'fw-bold'
        },
        {
            key: 'full_repayment_date',
            name: 'Full Repayment Date',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end fw-normal',
            format: 'date',
        },
        {
            key: 'total_collection',
            name: 'Total Collection',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end fw-normal',
            format: 'money',
        },
        {
            key: 'loan_amount',
            name: 'Loan Amount',
            classNameTableHead: 'text-end',
            classNameTableBody: 'text-end fw-normal',
            format: 'money',
        },

    ],
}
