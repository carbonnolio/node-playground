import EventEmitter from 'events';
import readLine from 'readline';
import server from './server';

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const srv = server(client);

srv.on('response', (response) => {
  process.stdout.write('\u001b[2J\u001b[0;0H'); // Clear terminal
  process.stdout.write(response);
  process.stdout.write('\r\n> ');
});

let command, args;
rl.on('line', (input) => {
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});
