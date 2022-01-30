import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen(process.env.APP_PORT, () => {
  global.console.log(
    'App running at http://localhost:%d',
    process.env.APP_PORT
  );
});
