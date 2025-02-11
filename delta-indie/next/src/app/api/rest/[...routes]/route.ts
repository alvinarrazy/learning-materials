import { NextRequest, NextResponse } from 'next/server';
import service from '@/app/api/service';
import { RestContext } from '@/app/api/rest/[...routes]/types';

export async function POST(req: NextRequest, { params }: RestContext) {
  const body = await req.json();
  const { routes } = await params;

  const { data } = await service.post(routes.join('/'), body);

  const response = NextResponse.json({
    message: 'success',
    ...data,
  });

  return response;
}
