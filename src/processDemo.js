process.on('exit', (code) => {
  console.log(`About to exit with code ${code}`);
});

process.on('uncaughtException', (err) => {
  console.error(err);

  // Force exit
  process.exit(1);
});

// Keep the event loop busy.
process.stdin.resume();
