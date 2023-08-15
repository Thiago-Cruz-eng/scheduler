export class TaskScheduleData {
  constructor (name: string, description: string) {
    this.name = name
    this.description = description
  }

  name: string
  description: string
  dateSchedule?: Date
  apiReturn?: string
  dateApiReturn?: Date
}
