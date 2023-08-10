import cron from "node-cron"

export default class setupCronJobs {

    worker() {
        console.log('entrei')
        cron.schedule("*/15 * * * * *", function () {
        
        
        
        
        
            console.log("---------------------");
            console.log("running a task every 15 seconds");
        });

    }

}
