import { LoginRequest, LoginResponse } from '@/types/auth';
import { ApiResponse } from '@/types/basic';
import api from './api';

export async function login(payload: LoginRequest) {
  return api.post<LoginResponse>('api/auth/login', payload);
}

export async function register(payload: LoginRequest) {
  return api.post<ApiResponse>('api/auth/register', payload);
}
