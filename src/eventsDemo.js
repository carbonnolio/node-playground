import EventEmitter from 'events';

export const GetResource = (c) => {
  const e = new EventEmitter();

  process.nextTick(() => {
    let count = 0;
    e.emit('start');
    const t = setInterval(() => {
      e.emit('data', ++count);

      if(count === c) {
        e.emit('end', count);
        clearInterval(t);
      }
    }, 10);
  });

  return (e);
}
