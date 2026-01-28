import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'data/articles.json');
  
  if (!fs.existsSync(filePath)) {
    return NextResponse.json([]);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const articles = JSON.parse(fileContents);
  
  return NextResponse.json(articles);
}
