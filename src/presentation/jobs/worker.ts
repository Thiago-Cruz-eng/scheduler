import cron from 'node-cron'
import { type TaskScheduleInterface } from '../../domain/protocols/TaskScheduleInterface'
import { CronExpression } from '../enum/cronEvent'
import { type AxiosHttpRequest } from '../protocols/request/AxiosHttpRequest'
import { type TaskSchedulerResponse } from '../protocols/response/TaskSchedulerResponse'

export default class SetupCronJobs {
  private readonly repository: TaskScheduleInterface
  private readonly boredApi: AxiosHttpRequest
  constructor (repository: TaskScheduleInterface, boredApi: AxiosHttpRequest) {
    this.repository = repository
    this.boredApi = boredApi
  }

  worker (): any {
    try {
      cron.schedule(CronExpression.EVERY_15_SECONDS, async () => {
        const isDate = await this.repository.getFilterSchedulerByDate()
        let isValidByDate: TaskSchedulerResponse
        if (isDate.length !== 0) {
          console.log(isDate)

          for (isValidByDate of isDate) {
            if (!isValidByDate.done && !isValidByDate.deleted) {
              const boredApiResponse = await this.boredApi.boredNeverMore()
              const dataIndoDataBase = await this.repository.updateApiReturn(isValidByDate.id, boredApiResponse.data.activity, new Date())
              console.log(dataIndoDataBase)
            } else {
              return {
                statusSchedule: 'no task schedule pending'
              }
            }
          }
        } else {
          console.log('no task schedule pending')
        }
      })
    } catch (error) {
      return {
        message: 'cannot enter on worker job',
        error
      }
    }
  }
}
