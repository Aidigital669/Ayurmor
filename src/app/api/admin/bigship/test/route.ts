import { NextResponse } from 'next/server';
import { getBigshipToken, getBigshipWarehouses } from '@/lib/bigship';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const token = await getBigshipToken();
    const warehouses = await getBigshipWarehouses();

    return NextResponse.json({
      success: true,
      message: 'Bigship Direct API Connected & Authenticated Successfully!',
      tokenPreview: `${token.substring(0, 20)}...`,
      warehouses: warehouses
    });
  } catch (error: any) {
    console.error('Bigship Direct API Test Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Bigship Direct API Connection Failed'
    }, { status: 500 });
  }
}
