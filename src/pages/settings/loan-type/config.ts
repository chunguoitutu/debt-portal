import {LoanTypeItem, TableConfig} from '@/app/types'
import Badge from '@/components/badge/Badge'
import {CheckboxRounded} from '@/components/checkbox'
import * as Yup from 'yup'

export const LOAN_TYPE_CONFIG: TableConfig<keyof LoanTypeItem> = {
  settings: {
    showAction: true,
    showEditButton: true,
    showDeleteButton: true,
    showViewButton: false,
    endPointDelete: '/config/loan_type',
    endPointGetListing: '/config/loan_type',
    messageDeleteSuccess: 'Loan Type "/%/" successfully deleted',
    buttonAddNew: 'New Loan Type',
    showMessageTitle: 'type_name',
    endpoint: 'config/loan_type',
    validation: Yup.object().shape({
      type_name: Yup.string()
        .trim()
        .required('Loan Type is required')
        .max(45, 'Loan Type must be at most 45 characters'),
      description: Yup.string()
        .trim()
        .max(1024, 'Description must be at most 1024 characters')
        .nullable(),
      interest: Yup.number().required('Default Interest is required'),
      quota_new: Yup.number().required('Quota For New Borrower is required'),
      quota_existing: Yup.number().required('Quota For Existing Borrower is required'),
      quota_foreigner: Yup.number().required('Quota For Foreigner Borrower is required'),
      late_fee: Yup.number().required('Late Fee is required'),
      late_interest: Yup.number()
        .required('Late Interest is required')
        .max(100, 'Late Fee must be at most 100')
        .positive('Late Fee must be a positive number'),
    }),
  },
  rows: [
    {
      classNameTableHead: 'w-50px w-90px',
      key: 'id',
      name: 'ID',
    },
    {
      classNameTableHead: 'w-200px min-w-150px',
      key: 'type_name',
      color: '#252F4A',
      name: 'Loan Type',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'text',
        required: true,
        column: 12,
      },
    },
    {
      classNameTableHead: 'w-200px mt-3 pe-3 min-w-100px',
      key: 'interest',
      name: 'Default Interest',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'number',
        required: true,
        column: 6,
      },
    },
    {
      classNameTableHead: 'w-200px ps-7 min-w-120px',
      key: 'quota_new',
      name: 'Quota New',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'number',
        required: true,
        column: 6,
      },
    },
    {
      classNameTableHead: 'w-200px ps-7 min-w-150px',
      key: 'quota_existing',
      name: 'Quota Existing',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'number',
        required: true,
        column: 6,
      },
    },
    {
      classNameTableHead: 'w-200px pe-3 min-w-150px',
      key: 'quota_foreigner',
      name: 'Quota Foreigner',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'number',
        required: true,
        column: 6,
      },
    },
    {
      classNameTableHead: 'w-200px pe-3 min-w-120px',
      key: 'late_fee',
      name: 'Monthly Late Fee',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'number',
        required: true,
        column: 6,
      },
    },
    {
      classNameTableHead: 'w-200px pe-3 min-w-120px',
      key: 'late_interest',
      name: 'Late Interest per month',
      infoCreateEdit: {
        typeComponent: 'input',
        type: 'number',
        required: true,
        column: 6,
      },
    },
    {
      classNameTableHead: 'w-500px min-w-150px',
      classNameTableBody: 'four-line',
      key: 'description',
      name: 'Description',
      infoCreateEdit: {
        typeComponent: 'textarea',
        type: 'text',
        column: 12,
      },
    },
    {
      classNameTableHead: 'w-200px min-w-150px  text-center',
      key: 'is_default',
      name: 'Default',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        subTextWhenChecked: 'Yes',
        subTextWhenNoChecked: 'No',
        defaultValue: 0,
        column: 6,
      },
    },
    {
      key: 'status',
      name: 'Status',
      component: Badge,
      infoCreateEdit: {
        typeComponent: 'checkbox-rounded',
        component: CheckboxRounded,
        defaultValue: 1,
        column: 6,
      },
    },
  ],
}
