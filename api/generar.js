import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { archivo } = req.query;

  if (!archivo) {
    return res.status(400).json({ error: "Falta archivo" });
  }

  const secret = process.env.JWT_SECRET || "supersecreto";
  const token = jwt.sign(
    { archivo, exp: Math.floor(Date.now() / 1000) + 5 * 60 }, // 5 min
    secret
  );

  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  res.status(200).json({ link: `${baseUrl}/api/download?token=${token}` });
}
