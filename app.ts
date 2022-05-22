import express from 'express';
import { expressErrorHandler } from './utils/errorHandler';
import Router from './Router';

const expressApp = () => {
  const app = express();
  const port = 3000;

  app.use('/', Router);
  app.use(expressErrorHandler);

  app.listen(port, () => console.log(`App listening on port ${port}`));
};

export default { expressApp };
