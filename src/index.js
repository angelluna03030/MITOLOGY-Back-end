const app = require("./app");
require("dotenv").config();
async function main() {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`servidor corriendo por el puerto ${PORT}`);
  });
}
main();
