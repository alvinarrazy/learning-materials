import { NextRequest, NextResponse } from 'next/server';
import service from '@/app/api/service';
import { RestContext } from '@/app/api/rest/[...routes]/types';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest, { params }: RestContext) {
  try {
    const body = await req.json();
    const { routes } = await params;
    const token = req.cookies.get('token')?.value;

    const { data } = await service(token).post(routes.join('/'), body);

    const response = NextResponse.json({
      message: 'success',
      ...data,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError;
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

export async function GET(req: NextRequest, { params }: RestContext) {
  try {
    const { routes } = await params;
    const token = req.cookies.get('token')?.value;

    const { data } = await service(token).get(routes.join('/'));

    const response = NextResponse.json({
      message: 'success',
      ...data,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError;
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
