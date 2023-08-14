import cron from 'node-cron'
import { type TaskScheduleInterface } from '../../domain/protocols/TaskScheduleInterface'
import { CronExpression } from '../enum/cronEvent'
import { type AxiosHttpRequest } from '../protocols/request/AxiosHttpRequest'
import { type TaskSchedulerResponse } from '../protocols/response/TaskSchedulerResponse'

export default class SetupCronJobs {
  private readonly repository: TaskScheduleInterface
  private readonly api: AxiosHttpRequest
  constructor (repository: TaskScheduleInterface, api: AxiosHttpRequest) {
    this.repository = repository
    this.api = api
  }

  worker (): any {
    try {
      cron.schedule(CronExpression.EVERY_15_SECONDS, async () => {
        const isValidToBeDone = await this.repository.getFilterSchedulerByDate()
        let isValidByDate: TaskSchedulerResponse
        if (isValidToBeDone.length !== 0) {
          console.log(isValidToBeDone)

          for (isValidByDate of isValidToBeDone) {
            if (!isValidByDate.done && !isValidByDate.deleted) {
              const boredApiResponse = await this.api.boredNeverMore()
              const dataIndoDataBase = await this.repository.updateApiReturn(isValidByDate.id, boredApiResponse.data.activity, new Date())
              console.log(dataIndoDataBase)
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
