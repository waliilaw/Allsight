// background worker for data reconciliation

import { CronJob } from 'cron';

// runs every hour to reconcile market data
const reconciliationJob = new CronJob('0 * * * *', async () => {
  console.log('running reconciliation...');
  // check for stale data, missing prices, etc
});

// runs daily to cleanup expired opportunities
const cleanupJob = new CronJob('0 0 * * *', async () => {
  console.log('running cleanup...');
  // delete old arbitrage records, closed positions, etc
});

reconciliationJob.start();
cleanupJob.start();
