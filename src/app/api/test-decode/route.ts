import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const base64Str = "X5Z1aBOBKpXNMmmyzDRmYDdNaHZ1R0FtVDZQVlZLK3Q5VEZoanZYakZiekx5MmlOcWV5bzdUREJ0NDJrcTNXcnl6M3dJVkpxZ3hMVHdRa3BNMHVaNHJFQUxTRS8rUjhCbkF0eXJRTzU3RUtmN0pyZDNPUDBoYUdzRzVZPQ==";
  try {
    const decoded = Buffer.from(base64Str, 'base64').toString('utf8');
    const decodedHex = Buffer.from(base64Str, 'base64').toString('hex');
    return NextResponse.json({
      success: true,
      decoded,
      decodedHex
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    });
  }
}
