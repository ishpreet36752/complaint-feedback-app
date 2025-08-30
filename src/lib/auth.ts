import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
  } catch (err) {
    return null;
  }
}

export function generateToken(payload: { id: string; role: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}
