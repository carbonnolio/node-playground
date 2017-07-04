import os from 'os';
import { GetResource } from './eventsDemo';
import { Resource } from './resource';
import { downloadAndSaveGzip } from './pipeDemo';
import processDemo from './processDemo';

const toMb = (f) => Math.round((f / 1024 / 1024) * 100) / 100;

console.log(`Host OS: ${os.hostname()}`);
console.log(`15 min load avg: ${os.loadavg()[2]}`);
console.log(`${toMb(os.freemem())} of ${toMb(os.totalmem())} Mb free.`);

const r = GetResource(5);

r.on('start', () => {
  console.log('Started!');
});

r.on('data', (d) => {
  console.log(`Received --->  ${d}` );
});

r.on('end', (t) => {
  console.log(`Done with ${t} data events.` );
});

const r1 = new Resource(7);

r1.on('start', () => {
  console.log('r1 Started!');
});

r1.on('data', (d) => {
  console.log(`r1 Received --->  ${d}` );
});

r1.on('end', (t) => {
  console.log(`r1 Done with ${t} data events.` );
});

downloadAndSaveGzip('https://www.citi.com/credit-cards/compare-credit-cards/citi.action?ID=view-all-credit-cards', 'boa.html');

//processDemo();
