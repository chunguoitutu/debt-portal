import {TableConfig} from '../../../modules/auth'
import SearchBar from './SearchBar'
import ToolBar from './ToolBar'

type Props = {
  config: TableConfig
  handleAddNew: () => void
}

const TableHelper = ({config, handleAddNew}: Props) => {
  return (
    <div className='card-header border-0 pt-6'>
      <SearchBar />
      <div className='card-toolbar'>
        <ToolBar config={config} handleAddNew={handleAddNew} />
      </div>
    </div>
  )
}

export default TableHelper
