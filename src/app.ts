import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import fs from 'fs';

import indexRouter from './routes/index';
import userRouter from './routes/user';
import authRouter from './routes/auth';
import transactionsRouter from './routes/transactions';
import accountsRouter from './routes/accounts';
import mailRouter from './routes/mail';

import schema from './schema';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/transactions', transactionsRouter);
app.use('/api/v1/accounts', accountsRouter);
app.use('/api/v1/mail', mailRouter);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

// render client side if route not in backend
const clientPath = path.join(__dirname, '../', 'client/build');

if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  app.get('/*', (_req, res) => {
    res.sendfile(path.join(clientPath, 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(
  err: Error,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status((<any>err).status || 500);
  res.render('error');
});

export default app;
