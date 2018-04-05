import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import generate from '../server/routes/generate';
import compare from '../server/routes/compare';

const app = express();
const db = 'mongodb://godwinekuma:godwin1699@ds113795.mlab.com:13795/dataverifier';
mongoose.connect(db)
  .catch((error) => {
      if (error) {
          message: 'Cinnection Error'
      }
  });
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/verifier', generate);
app.use('/verifier', compare);

const port = process.env.PORT || 2018;
app.listen(port, () => {
    console.log(`App is listening to Port: ${port}`)
});

export default app;