import { NextRequest, NextResponse } from 'next/server';
import service from '@/app/api/service';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data } = await service().post('auth/login', body);

    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set({
      name: 'token',
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError;
    console.log();
    const response = NextResponse.json(
      {
        message: 'Something went wrong',
        ...(error?.response?.data || {}),
      },
      { status: error.status },
    );
    return response;
  }
}
