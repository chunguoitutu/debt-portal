import {HOUSING_HDB_TYPE} from '@/app/utils'

type Props = {
  config: any
  data: any
  keyData: any
}

const HousingType = ({config, keyData}: Props) => {
  const lable = HOUSING_HDB_TYPE.filter((d: any) => d[config.keyFilter] === keyData)

  return (
    <div className='text-start fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px td-completion fs-14 text-gray-900'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}
export default HousingType
