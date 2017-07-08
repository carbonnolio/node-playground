const chalk = require('chalk');

const print = (stars, header) => {
  console.log(chalk.cyan('*'.repeat(stars)));
  console.log(chalk.red(header));
  console.log(chalk.cyan('*'.repeat(stars)));
}

if(require.main === module) {
  // Running as script
  print(process.argv[2], process.argv[3]);
} else {
  // Being reqired
  module.exports = print;
}
