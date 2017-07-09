import server from 'net';
import chalk from 'chalk';

const srv = server.createServer();
let counter = 0;
let sockets = {};

const timestamp = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

srv.on('connection', socket => {
  socket.id = counter++;

  console.log(chalk.yellow('Client connected.'));
  socket.write(chalk.yellow('Please enter your name here: '));

  socket.on('data', data => {
    if(!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome ${socket.name}!`);
      sockets[socket.id] = socket;
      return;
    }

    Object.entries(sockets).forEach(([key, cs]) => {
      if(socket.id == key) return;

       cs.write(`${socket.name} ${timestamp()}: `);
      cs.write(chalk.white(data));
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    console.log(chalk.yellow('Client disconnected.'));
  });
});

srv.listen(8000, () => console.log(chalk.blue('Server bound.')));
