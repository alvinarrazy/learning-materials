import { NextResponse } from 'next/server';

export async function GET(req) {
  const response = NextResponse.json({ message: 'Login successful' });

  response.cookies.set({
    name: 'token',
    value: 'your-jwt-token', // Replace with real JWT
    httpOnly: true, // Prevent access from JavaScript
    secure: process.env.NODE_ENV === 'production', // Secure in production
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
