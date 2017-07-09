import EventEmitter from 'events';
import chalk from 'chalk';

class Server extends EventEmitter {
  constructor(client) {
    super();

    this.tasks = {};
    this.taskId = 1;

    process.nextTick(() => {
      this.emit('response', chalk.yellow('Type a command (help to list commands)'));
    });

    client.on('command', (command, args) => {
      switch (command) {
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
          this[command](args);
          break;

        default:
          this.emit('response', chalk.red('Unknown command...'));
          break;
      }
    });
  }

  help() {
    this.emit('response', chalk.grey(`Available commands:
    add task
    ls
    delete :id`));
  }

  add(args) {
    this.tasks[this.taskId] = args.join(' ');
    this.emit('response', chalk.grey(`Added task ${this.taskId}`));
    this.taskId++;
  }

  ls() {
    this.emit('response', chalk.magenta(`Tasks:\r\n${this.tasksString()}`));
  }

  delete(args) {
    delete(this.tasks[args[0]]);
    this.emit('response', chalk.grey(`Deleted task ${args[0]}`));
  }

  tasksString() {
    return Object.keys(this.tasks).map(x => `${x}: ${this.tasks[x]}`).join('\r\n');
  }
}

module.exports = (client) => new Server(client);
