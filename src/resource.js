import EventEmitter from 'events';

export class Resource extends EventEmitter {
  constructor(c) {
    super();

    process.nextTick(() => {
      let count = 0;
      this.emit('start');

      const t = setInterval(() => {
        this.emit('data', ++count);

        if (count === c) {
          this.emit('end', count);
          clearInterval(t);
        }
      }, 10);
    });
  }
}
