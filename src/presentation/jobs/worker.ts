import TaskSchedulerRepository from "@/data/taskScheduler/repository/scheduler/taskSchedulerRepository";
import { TaskScheduleInterface } from "@/domain/protocols/taskScheduleInterface";
import cron from "node-cron"

export default class setupCronJobs {
    private repository: TaskScheduleInterface = new TaskSchedulerRepository()
    worker() {
        console.log('entrei')
        cron.schedule("*/15 * * * * *", async () => {

            const isDate = await this.repository.getFilterSchedulerByDate()
            const isDone = await this.repository.getFilterSchedulerByDone()

            
        
            //acessar meu banco e filtrar por DONE e entao por DATE
            //verificar se DONE === 0 && DATE < NOW()
            //buscar na api (sei la, de piadas) 
            //se me retornar sucesso, gravar no banco que deu certo (done === 1) e hora que ocorreu DATE == NOW()

            //se nao acontecer por algum motivo? tenta novamente?
            //se por acaso eu subir mais que uma instancia da aplic como seria o tratamento para nao rodar x vezes a mesma coisa?

        
        
        
            console.log("---------------------");
            console.log("running a task every 15 seconds");
        });

    }

}
