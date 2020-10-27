const CronJob = require('cron').CronJob;

const { processAbandonmentShoppingCartFactory } = require('./../../domain/use-cases/process-abandonment-shopping-cart');
const { processAbandonmentShoppingCart } = processAbandonmentShoppingCartFactory();

exports.CronJobFactory = ({ ENV, ShoppingCart } = {}) => {
  return {
    cronjob: ({ timeExecuteJob } = {}) => {
      const job = new CronJob(
        timeExecuteJob,
        function () {
          processAbandonmentShoppingCart(ENV, ShoppingCart);
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
