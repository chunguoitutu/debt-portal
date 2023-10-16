import {TableConfig} from '../../../modules/auth'
import SearchBar from './SearchBar'
import ToolBar from './ToolBar'

type Props = {
  config: TableConfig
  handleAddNew: () => void
}

const TableHelper = ({config, handleAddNew}: Props) => {
  const {showSearch} = config?.settings
  return (
    <div className='card-header border-0 pt-6'>
      <div>{showSearch && <SearchBar />}</div>
      <div className='card-toolbar'>
        <ToolBar config={config} handleAddNew={handleAddNew} />
      </div>
    </div>
  )
}

export default TableHelper
