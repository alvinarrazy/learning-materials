import { NextRequest, NextResponse } from 'next/server';
import service from '@/app/api/service';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data } = await service.post('auth/login', body);

  const response = NextResponse.json({ message: 'Login successful' });

  response.cookies.set({
    name: 'token',
    value: data.token, // Replace with real JWT
    httpOnly: true, // Prevent access from JavaScript
    secure: process.env.NODE_ENV === 'production', // Secure in production
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
