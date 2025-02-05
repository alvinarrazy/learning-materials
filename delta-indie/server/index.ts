import express, { RequestHandler } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

app.options('*', cors());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// export const processRequest: RequestHandler = async (req, res) => {
//   const originalUrl = `https://${req.originalUrl.replace('/api/', '')}`;

//   try {
//     const contentType = req.headers['content-type'] || '';
//     let params = req.body;
//     if (contentType.includes('x-www-form-urlencoded')) {
//       const urlSearchParams = new URLSearchParams(params);
//       params = urlSearchParams.toString();
//     }
//     const reqHeaders = { ...req.headers };
//     delete reqHeaders.authorization;
//     delete reqHeaders['host'];
//     delete reqHeaders['connection'];
//     delete reqHeaders['pragma'];
//     delete reqHeaders['cache-control'];
//     delete reqHeaders['user-agent'];
//     delete reqHeaders['referer'];

//     const response = await axios.request({
//       method: req.method.toLowerCase(),
//       url: originalUrl,
//       headers: reqHeaders,
//       ...(Object.keys(params).length > 0 && { data: params }),
//     });

//     res.status(200).json(response.data);
//   } catch (err) {
//     res.status(500).json({ message: 'Error!', error: err });
//   }
// };

app.use('/api', router);
// app.use('/api/*', authenticate, processRequest);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

module.exports = app;
