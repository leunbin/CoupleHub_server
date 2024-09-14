const App = require("../src/app");

async function main() {
  const app = await App();
  app.start();
}

main();
