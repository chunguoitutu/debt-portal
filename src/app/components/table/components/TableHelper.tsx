import SearchBar from './SearchBar'
import ToolBar from './ToolBar'

const TableHelper = () => {
  return (
    <div className='card-header border-0 pt-6'>
      <SearchBar />
      <div className='card-toolbar'>
        <ToolBar />
      </div>
    </div>
  )
}

export default TableHelper
