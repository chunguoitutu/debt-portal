import FilterIcon from './Filter'
import ExportIcon from './Export'
import AddIcon from './Add'

const icons = {
  filterIcon: FilterIcon,
  ExportIcon: ExportIcon,
  AddIcon: AddIcon,
}

const Icons = ({name}) => {
  const RenderIcon = icons[name]
  if (RenderIcon) {
    return <RenderIcon />
  }
  return null
}
export default Icons
