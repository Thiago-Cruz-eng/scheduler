import cron from 'node-cron'
import { type TaskScheduleInterface } from '../../domain/protocols/taskScheduleInterface'
import { type TaskSchedulerResponse } from '../protocols/TaskSchedulerResponse'

export default class SetupCronJobs {
  private readonly repository: TaskScheduleInterface
  constructor (repository: TaskScheduleInterface) {
    this.repository = repository
  }

  worker (): any {
    try {
      console.log('entrei')
      cron.schedule('*/15 * * * * *', async () => {
        const isDate = await this.repository.getFilterSchedulerByDate()
        let isValidByDate: TaskSchedulerResponse

        if (isDate) {
          for (isValidByDate of isDate) {
            if (!isValidByDate.done && !isValidByDate.deleted) {
              console.log(isValidByDate)
            } else {
              console.log('no task schedule pending')
            }
          }
        }

        // acessar meu banco e filtrar por DONE e entao por DATE
        // verificar se DONE === 0 && DATE < NOW()
        // buscar na api (sei la, de piadas)
        // se me retornar sucesso, gravar no banco que deu certo (done === 1) e hora que ocorreu DATE == NOW()

        // se nao acontecer por algum motivo? tenta novamente?
        // se por acaso eu subir mais que uma instancia da aplic como seria o tratamento para nao rodar x vezes a mesma coisa?

        console.log('---------------------')
        console.log('running a task every 15 seconds')
      })
    } catch (error) {
      console.log('cannot enter on worker job: ', error)
    }
  }
}
