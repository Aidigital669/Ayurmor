import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const srcFile = `C:\\Users\\ADMIN\\.gemini\\antigravity-ide\\brain\\bceecd13-3ed9-41c9-afea-dd0a06c31593\\media__1784705001178.jpg`;
    const publicDir = path.join(process.cwd(), 'public');
    
    if (!fs.existsSync(srcFile)) {
      return NextResponse.json({ error: 'Source logo file not found' }, { status: 444 });
    }

    const dstJpg = path.join(publicDir, 'ayurmor_dark_logo.jpg');
    const dstPng = path.join(publicDir, 'Ayurmor.png');
    const dstDarkPng = path.join(publicDir, 'Ayurmor_dark.png');

    const fileBuffer = fs.readFileSync(srcFile);
    fs.writeFileSync(dstJpg, fileBuffer);
    fs.writeFileSync(dstPng, fileBuffer);
    fs.writeFileSync(dstDarkPng, fileBuffer);

    return NextResponse.json({ 
      success: true, 
      message: 'Logo updated successfully in public directory!',
      paths: ['ayurmor_dark_logo.jpg', 'Ayurmor.png', 'Ayurmor_dark.png']
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
