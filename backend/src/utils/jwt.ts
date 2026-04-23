import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

const payload = {
  userId: user.id,
  role: user.role,
};

const options: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as any,
};

const token = jwt.sign(payload, env.JWT_SECRET, options);
