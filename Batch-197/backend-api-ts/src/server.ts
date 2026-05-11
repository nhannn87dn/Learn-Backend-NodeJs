import { ENV } from './config/env';
import app from './app';
const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})