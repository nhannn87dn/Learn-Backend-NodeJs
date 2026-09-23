import { ENV } from "./config/env";
import app from "./app";


const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});