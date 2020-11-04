const CronJob = require('cron').CronJob;

exports.CronJobFactory = ({ ENV } = {}) => {
  return {
    cronjob: ({ timeExecuteJob, onJobExecution } = {}) => {
      const job = new CronJob(
        timeExecuteJob,
        function () {
          onJobExecution();
        },
        null,
        true,
        ENV.TIME_ZONE,
      );
      return {
        cronJobConfig: {
          job: job,
        },
      };
    },
  };
};
