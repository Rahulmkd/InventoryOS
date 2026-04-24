import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

/**
 * Token Payload Type (Strong typing)
 */
export interface TokenPayload {
  userId: string;
  role: string;
}

/**
 * Generate Access Token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN, // e.g. "15m"
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
};

/**
 * Generate Refresh Token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN, // e.g. "7d"
  };

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};
