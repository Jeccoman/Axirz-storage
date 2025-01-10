require("dotenv").config();
const CronJob = require("cron").CronJob;
const Rsync = require("rsync");


rsync = new Rsync()
 
  .flags("a")
  .source(process.env.SOURCE_DIR)
  .destination(process.env.DESTINATION_DIR);

const job = new CronJob(
   process.env.CRON_STRING,
  () => {
    rsync.execute((error, code, cmd) => {
      
      console.log("backup completed with status code: " + code);
    });
  },
  null,
  true,

  "Africa/Nairobi"
);

job.start();
