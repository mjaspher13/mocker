import fs from "fs";
import path from "path";

export async function GET(req) {
  console.log("get json route");
  const filePath = path.join(process.cwd(), "../server/routes.json");

  try {
    const data = fs.readFileSync(filePath, "utf8");
    return new Response(JSON.stringify(JSON.parse(data)), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error reading JSON file" }), {
      status: 500,
    });
  }
}
