import {BLOCK_ADDRESS_CONFIG} from '@/pages/applications/step-component/config'
import {BlockAddress} from '../types/common'
import {PROPERTY_TYPE} from '../utils'

export function handleCreateBlockAddress(isHomeAddress: boolean): BlockAddress {
  const defaultValue: any = isHomeAddress
    ? {
        property_type: PROPERTY_TYPE[0].value,
        existing_staying: 1,
        housing_type: '',
        home_ownership: '',
        staying_condition: '',
      }
    : {
        is_default: 0,
        home_ownership: ' ',
        staying_condition: ' ',
        housing_type: ' ',
      }

  const value = BLOCK_ADDRESS_CONFIG.reduce(
    (acc, config) => ({...acc, [config.key]: config.defaultValue || ''}),
    {}
  ) as BlockAddress

  return {...value, ...defaultValue}
}

export const GLOBAL_CONSTANTS = {
  loanRepaymentConfigColumn: 'loan-repayment-config-column',
}
