import app from './src/app'
import { globalConfig } from './src/constants/config';

console.log('<<=== 🚀 globalConfig ===>>',globalConfig);
app.listen(globalConfig.PORT, () => {
    console.log(`Example app listening on port ${globalConfig.PORT}`);
});
  