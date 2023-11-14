import FilterIcon from './Filter'
import ExportIcon from './Export'
import AddIcon from './Add'
import ImgAvataRemark from './ImgAvataRemark'
import ImgCalendar from './ImgCalendar'
import ImgFoder from './ImgFoder'
import ImgLeftArrow from './ImgLeftArrow'
import ImgLoanCrossCheck from './ImgLoanCrossCheck'
import ImgPrintOptions from './ImgPrintOptions'
import ImgSend from './ImgSend'
import ImgUploadFile from './ImgUploadFile'

const icons = {
  filterIcon: FilterIcon,
  ExportIcon: ExportIcon,
  AddIcon: AddIcon,
  ImgAvataRemark: ImgAvataRemark,
  ImgCalendar: ImgCalendar,
  ImgFoder: ImgFoder,
  ImgLeftArrow: ImgLeftArrow,
  ImgLoanCrossCheck: ImgLoanCrossCheck,
  ImgPrintOptions: ImgPrintOptions,
  ImgSend: ImgSend,
  ImgUploadFile: ImgUploadFile,
}

const Icons = ({name}) => {
  const RenderIcon = icons[name]
  if (RenderIcon) {
    return <RenderIcon />
  }
  return null
}
export default Icons
