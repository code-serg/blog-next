import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: port(),
  MONGODB_CONNECTION_STRING: str(),
  FRONTEND_URL: str(),
  SERVER_URL: str(),
});

export default env;
