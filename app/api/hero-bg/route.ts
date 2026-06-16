import { readFileSync, existsSync } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  const imagePath = 'C:/Users/samar/.gemini/antigravity-ide/brain/22735c31-0bcb-49c0-b8ec-6ccfa3c7e80c/media__1781607698847.jpg';
  
  if (!existsSync(imagePath)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  const file = readFileSync(imagePath);
  return new NextResponse(file, { 
    headers: { 
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    } 
  });
}
