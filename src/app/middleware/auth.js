import jwt from "jsonwebtoken";

export async function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response("Invalid token", { status: 401 });
  }
}
