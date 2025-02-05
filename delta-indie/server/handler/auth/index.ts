import { RequestHandler } from 'express';
import { AuthErrorMessage } from './constants';
import { generateToken, registerUser } from '../../service/auth';

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw 401;
    }

    const token = await generateToken(username, password);
    res.status(200).json({ token });
  } catch (err) {
    if (err === 401 || err === 404) {
      res.status(err).json({ message: AuthErrorMessage.InvalidCredential });
      return;
    }
    res.status(500).json({ message: 'login failed', error: err });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw 401;
    }

    await registerUser(username, password);

    res.status(200).json({ message: 'success' });
  } catch (err) {
    if (err === 401 || err === 404) {
      res.status(err).json({ message: AuthErrorMessage.InvalidCredential });
      return;
    }
    res.status(500).json({ message: 'register failed', error: err });
  }
};
