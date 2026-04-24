import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";

/**
 * Token Payload Type
 */
export interface TokenPayload extends JwtPayload {
  userId: string;
  role: string;
}

/**
 * SIGN ACCESS TOKEN
 */
export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: jwtConfig.access.expiresIn,
  };

  return jwt.sign(payload, jwtConfig.access.secret, options);
};

/**
 * SIGN REFRESH TOKEN
 */
export const signRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: jwtConfig.refresh.expiresIn,
  };

  return jwt.sign(payload, jwtConfig.refresh.secret, options);
};

/**
 * VERIFY ACCESS TOKEN
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, jwtConfig.access.secret) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};

/**
 * VERIFY REFRESH TOKEN
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, jwtConfig.refresh.secret) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
