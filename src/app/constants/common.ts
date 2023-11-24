import {BLOCK_ADDRESS_CONFIG} from '@/pages/applications/step-component/config'
import {BlockAddress} from '../types/common'

export const INIT_BLOCK_ADDRESS: BlockAddress = BLOCK_ADDRESS_CONFIG.reduce(
  (acc, config) => ({...acc, [config.key]: config.defaultValue || ''}),
  {}
) as BlockAddress
