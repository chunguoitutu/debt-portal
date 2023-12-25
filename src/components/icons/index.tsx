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
import Close from './Close'
import Home from './Home'
import Email from './Email'
import Telephone from './Telephone'
import HomeSmall from './HomeSmall'
import {Mes} from './Mes'
import GoogleCheck from './GoogleCheck'
import Warning from './Warning'
import FolderPdf from './FolderPdf'
import CloseSmall from './CloseSmall'

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
  Close: Close,
  Home: Home,
  Email: Email,
  Telephone: Telephone,
  HomeSmall: HomeSmall,
  Mes: Mes,
  GoogleCheck: GoogleCheck,
  Warning: Warning,
  FolderPdf: FolderPdf,
  CloseSmall: CloseSmall,
}

const Icons = ({name}) => {
  const RenderIcon = icons[name]
  if (RenderIcon) {
    return <RenderIcon />
  }
  return null
}
export default Icons
