import os from 'os';
/*eslint-disable no-console*/

const toMb = (f) => Math.round((f / 1024 / 1024) * 100) / 100;

console.log(`Host OS: ${os.hostname()}`);
console.log(`15 min load avg: ${os.loadavg()[2]}`);
console.log(`${toMb(os.freemem())} of ${toMb(os.totalmem())} Mb free.`);
