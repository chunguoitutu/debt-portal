
export type MyTaskProps = {
    taskInfo: MyTask
}

export type MyTask = {
    id: number
    task_priority: any
    task_description: any
    start_date: Date
    end_date: Date
    status: number
    company_id: number
    task_assigne: null | TaskAssigne
    document: any
}

export type TaskAssigne = {
    id: number
    officer_id: number
    assignment_date: string
}  