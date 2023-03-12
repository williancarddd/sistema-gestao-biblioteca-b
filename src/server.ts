import { customExpress, customExpressSSL } from "./app";
import "reflect-metadata";

async function startServer() {
  try {
    customExpress().listen(3535, () =>
      console.log("Sistema Biblioteca rodando na http 3535")
    );
    customExpressSSL().listen(4545, () =>
      console.log("Sistema Biblioteca rodando na https 4545")
    );
    // mySeeds.execute()
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
