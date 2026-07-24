import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });
    return response;
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
