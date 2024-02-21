import express, { Application } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import { router } from '#v1';
import { auth, errorConverter, errorHandler } from '#middlewares';
import { config } from '#config';
import { connectDb } from '#mongo-connect';
import { ApiError } from '#utils';

connectDb();

export var app: Application = express();

app.use(auth);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.basePath, router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
