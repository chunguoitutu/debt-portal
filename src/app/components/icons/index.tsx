import FilterIcon from './Filter'

const icons = {
  filterIcon: FilterIcon,
}

const Icons = ({name}) => {
  const RenderIcon = icons[name]
  if (RenderIcon) {
    return <RenderIcon />
  }
  return null
}
export default Icons
