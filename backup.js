
require("dotenv").config();
const CronJob = require("cron").CronJob;
const Rsync = require("rsync");

const syncProgram = process.platform === "win32" ? "robocopy" : "rsync";

rsync = new Rsync()
  .executable(syncProgram)
  .flags("a")
  .source(process.env.SOURCE_DIR)
  .destination(process.env.DESTINATION_DIR);

const job = new CronJob(
  process.env.CRON_STRING,
  () => {
    rsync.execute((error, code, cmd) => {
      let result;
      if (error) {

        result = `Code ${code} ${error?.message}`;
      } else {
        result = "Backup complete";
      }

      const currentDate = new Date().toISOString();
      
      process.stdout.write(`${currentDate}: ${result}\n`);
    });
  },
  null,
  true,
  
  "Africa/Nairobi"
);

job.start();