import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: port(),
  MONGODB_CONNECTION_STRING: str(),
});

export default env;
