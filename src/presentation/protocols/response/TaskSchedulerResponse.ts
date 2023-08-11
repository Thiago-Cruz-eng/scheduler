export interface TaskSchedulerResponse {
  id: string
  name: string
  description: string
  dateSchedule: Date
  done: boolean
  deleted: boolean
  apiReturn: string
  dateApiReturn: Date
}
