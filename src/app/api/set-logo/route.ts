import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const brainDir = `C:/Users/ADMIN/.gemini/antigravity-ide/brain/bceecd13-3ed9-41c9-afea-dd0a06c31593`;
    const files = fs.readdirSync(brainDir);
    const mediaFiles = files.filter(f => f.startsWith('media__'));
    
    const publicDir = path.join(process.cwd(), 'public');

    // Find the latest media file or media__1784705001178.jpg
    const latestMedia = mediaFiles.includes('media__1784705001178.jpg') 
      ? 'media__1784705001178.jpg' 
      : mediaFiles[mediaFiles.length - 1];

    if (!latestMedia) {
      return NextResponse.json({ error: 'No media file found in brain dir', files });
    }

    const srcPath = path.join(brainDir, latestMedia);
    const buf = fs.readFileSync(srcPath);

    fs.writeFileSync(path.join(publicDir, 'Ayurmor.png'), buf);
    fs.writeFileSync(path.join(publicDir, 'Ayurmor_dark.jpg'), buf);
    fs.writeFileSync(path.join(publicDir, 'Ayurmor_dark.png'), buf);

    return NextResponse.json({
      success: true,
      copiedFrom: srcPath,
      bytes: buf.length,
      mediaFiles
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, stack: err.stack });
  }
}
