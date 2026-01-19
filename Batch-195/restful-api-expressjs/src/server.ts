import app from './app';
import { getEnv } from './common/configs/env';

const PORT = getEnv().PORT;

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
