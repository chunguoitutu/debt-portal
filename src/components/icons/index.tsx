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
import MLCB from './MLCB'
import Google from './Google'
import Cascheck from './Cascheck'
import UPCheck from './UPCheck'
import FilterIconBorrower from './FilterIconBorrower'
import MinusCustomer from './MinusCustomer'
import AddCustomer from './AddCustomer'
import AddressCustomer from './AddressCustomer'
import TimeMyTasks from './TimeMyTasks'
import PeopleMyTasks from './PeopleMyTasks'
import FileMyTask from './FileMyTask'

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
  MinusCustomer: MinusCustomer,
  AddCustomer: AddCustomer,
  Telephone: Telephone,
  HomeSmall: HomeSmall,
  Mes: Mes,
  AddressCustomer: AddressCustomer,
  GoogleCheck: GoogleCheck,
  Warning: Warning,
  Google: Google,
  FolderPdf: FolderPdf,
  CloseSmall: CloseSmall,
  MLCB: MLCB,
  Cascheck: Cascheck,
  UPCheck: UPCheck,
  FilterIconBorrower: FilterIconBorrower,
  TimeMyTasks: TimeMyTasks,
  PeopleMyTasks: PeopleMyTasks,
  FileMyTask: FileMyTask,
}

const Icons = ({name}) => {
  const RenderIcon = icons[name]
  if (RenderIcon) {
    return <RenderIcon />
  }
  return null
}
export default Icons
