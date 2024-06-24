import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const filePath = path.join(process.cwd(), '../server/routes.json');
  try {
    const body = await req.json();
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');
    return new Response(JSON.stringify({ message: 'JSON data updated successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error writing JSON file' }), { status: 500 });
  }
}
