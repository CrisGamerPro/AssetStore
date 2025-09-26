import path from "path";
import { promises as fs } from "fs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { token } = req.query;

  try {
    const secret = process.env.JWT_SECRET || "supersecreto";
    const data = jwt.verify(token, secret); // valida firma + exp

    const filePath = path.join(process.cwd(), "private-assets", data.archivo);
    const file = await fs.readFile(filePath);

    res.setHeader("Content-Disposition", `attachment; filename=${data.archivo}`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(file);

  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}
