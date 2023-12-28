import {HOUSING_HDB_TYPE, HOUSING_PRIVATE_RESIDENTIAL} from '@/app/utils'

type Props = {
  config: any
  data: any
  dataChildren: any
  keyData: any
}

const HousingType = ({config, keyData, dataChildren}: Props) => {
  console.log(dataChildren?.property_type)

  const lable = (
    dataChildren?.property_type === 'HDB' ? HOUSING_HDB_TYPE : HOUSING_PRIVATE_RESIDENTIAL
  ).filter((d: any) => d[config.keyFilter] === keyData)

  return (
    <div className='text-start fw-semibold pt-4px pt-0 px-0 m-0 min-h-20px td-completion fs-14 text-gray-900'>
      {!!config.lable ? lable[0]?.[config.lable] : lable[0]?.label}
    </div>
  )
}
export default HousingType
