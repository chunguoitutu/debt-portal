import { MyTaskConfig, TableConfig } from '@/app/types'
import { POSITION, PRIORITY_TASK, convertMessageErrorMaximum } from '@/app/utils'
import { Select } from '@/components/select'
import FileDocument from '../applications/step-component/employment/FileDocument'
import Radio from '@/components/radio/Radio'
import { Input } from '@/components/input'
import * as Yup from 'yup'
import { TextArea } from '@/components/textarea'



const MY_TASK_CONFIG: MyTaskConfig[] = [
    {
        key: 'my_task_priority',
        data: PRIORITY_TASK,
        defaultValue: PRIORITY_TASK[0].value,
        component: Radio,
        typeComponent: 'Radio',
        label: ' ',
    },
    {
        key: 'task_title',
        component: Input,
        typeComponent: 'Input',
        label: 'Task Title',
        validationFormik: Yup.string().max(100, convertMessageErrorMaximum(100)),
    },
    {
        key: 'description',
        component: TextArea,
        typeComponent: 'Input',
        label: 'Description',
    },
    {
        key: 'start_date',
        component: Input,
        typeComponent: 'Input',
        label: 'Telephone',
        column: 6,
    },
    {
        key: 'end_date',
        component: Input,
        typeComponent: 'Input',
        column: 6,
        className: 'justify-content-xxl-end',
    },
    {
        key: 'assign_to',
        component: Select,
        typeComponent: 'Select',
        options: POSITION,
        label: 'Assigne To',
    },

    {
        key: 'file_documents',
        component: FileDocument,
        defaultValue: [],
    },

]

export { MY_TASK_CONFIG }