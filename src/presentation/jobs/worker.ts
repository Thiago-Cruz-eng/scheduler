import cron from 'node-cron'
import { type TaskScheduleInterface } from '../../domain/protocols/taskScheduleInterface'
import { type TaskSchedulerResponse } from '../protocols/TaskSchedulerResponse'
import { CronExpression } from '../enum/cronEvent'
import { type AxiosHttpRequest } from '../protocols/AxiosHttpRequest'

export default class SetupCronJobs {
  private readonly repository: TaskScheduleInterface
  private readonly boredApi: AxiosHttpRequest
  constructor (repository: TaskScheduleInterface, boredApi: AxiosHttpRequest) {
    this.repository = repository
    this.boredApi = boredApi
  }

  worker (): any {
    try {
      console.log('entrei')
      cron.schedule(CronExpression.EVERY_15_SECONDS, async () => {
        const isDate = await this.repository.getFilterSchedulerByDate()
        let isValidByDate: TaskSchedulerResponse

        if (isDate) {
          for (isValidByDate of isDate) {
            if (!isValidByDate.done && !isValidByDate.deleted) {
              console.log(isValidByDate)

              const boredApiReturn = await this.boredApi.boredNeverMore()
              console.log(boredApiReturn.data)
            } else {
              return {
                statusSchedule: 'no task schedule pending'
              }
            }
          }
        }
        // buscar na api (sei la, de piadas)
        // se me retornar sucesso, gravar no banco que deu certo (done === 1) e hora que ocorreu DATE == NOW()

        // axios http interface resquest and response
        // criar campo no DB para savar o retorno da api
        // pegar a response (que ta tipada) e incluir no db

        // se nao acontecer por algum motivo? tenta novamente?
        // se por acaso eu subir mais que uma instancia da aplic como seria o tratamento para nao rodar x vezes a mesma coisa?
      })
    } catch (error) {
      return {
        message: 'cannot enter on worker job',
        error
      }
    }
  }
}
