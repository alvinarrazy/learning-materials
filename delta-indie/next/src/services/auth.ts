import { LoginRequest } from '@/types/auth';
import { ApiResponse } from '@/types/basic';
import axios from 'axios';

export async function login(payload: LoginRequest) {
  return axios.post<ApiResponse>(
    'https://delta-indie.vercel.app/api/auth/login',
    payload,
  );
}

export async function register(payload: LoginRequest) {
  return axios.post<ApiResponse>(
    'https://delta-indie.vercel.app/api/auth/register',
    payload,
  );
}
