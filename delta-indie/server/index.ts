import express, { RequestHandler } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;
const SECRET = 'secret';

app.options('*', cors()); // Allow preflight requests
app.use(
  cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

app.use(bodyParser.json());

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: username }, SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};

export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

export const processRequest: RequestHandler = async (req, res, next) => {
  const originalUrl = `https://${req.originalUrl.replace('/api/', '')}`;

  try {
    const contentType = req.headers['content-type'] || '';
    let params = req.body;
    if (contentType.includes('x-www-form-urlencoded')) {
      const urlSearchParams = new URLSearchParams(params);
      params = urlSearchParams.toString();
    }
    const reqHeaders = { ...req.headers };
    delete reqHeaders.authorization;
    delete reqHeaders['host'];
    delete reqHeaders['connection'];
    delete reqHeaders['pragma'];
    delete reqHeaders['cache-control'];
    delete reqHeaders['user-agent'];
    delete reqHeaders['referer'];

    const response = await axios.request({
      method: req.method.toLowerCase(),
      url: originalUrl,
      headers: reqHeaders,
      ...(Object.keys(params).length > 0 && { data: params }),
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Error!', error: err });
  }
};

app.use('/api/login', login);
app.use('/api/*', authenticate, processRequest);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

module.exports = app;
