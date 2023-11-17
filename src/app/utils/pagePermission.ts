import {CheckboxTreeItem} from '../types/common'

const ACTION_CONTROL = [
  {
    value: 'view',
    label: 'View',
    active: false,
  },
  {
    value: 'add',
    label: 'Add',
    active: false,
  },
  {
    value: 'edit',
    label: 'Edit',
    active: false,
  },
  {
    value: 'delete',
    label: 'Delete',
    active: false,
  },
]

export const PAGE_PERMISSION: {
  setting: CheckboxTreeItem[]
} = {
  setting: [
    {
      label: 'Company Information',
      value: 'company-management',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Company Information`,
      })),
    },
    {
      label: 'Companies',
      value: 'companies',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Companies`,
      })),
    },
    {
      label: 'User Listing',
      value: 'users',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-User Listing`,
      })),
    },
    {
      label: 'Roles',
      value: 'roles',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Roles`,
      })),
    },
    {
      label: 'Document Type',
      value: 'document-type',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Document Type`,
      })),
    },
    {
      label: 'Loan Type',
      value: 'loan-type',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Loan Type`,
      })),
    },
    {
      label: 'Job Type',
      value: 'job-type',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Job Type`,
      })),
    },
    {
      label: 'Address Type',
      value: 'address-type',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Address Type`,
      })),
    },
    {
      label: 'Marketing Type',
      value: 'marketing-type',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Marketing Type`,
      })),
    },
    {
      label: 'Rejection Type',
      value: 'rejection-type',
      isAccess: false,
      children: [...ACTION_CONTROL].map((item) => ({
        ...item,
        value: `${item.value}-Rejection Type`,
      })),
    },
  ],
}
