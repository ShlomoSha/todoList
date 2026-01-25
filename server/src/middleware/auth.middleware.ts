import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ForbiddenError, UnauthorizedError } from "../errors/httpErrors";
import { JWT_SECRET } from "../config/env.config";
import JwtPayload from "../types/jwt.payload";
import { getUserById } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('No token provided - please login')
  }

  const token = authHeader.split(' ')[1]

  const decoded = jwt.verify(
    token, 
    JWT_SECRET,
  ) as JwtPayload

  const user = await getUserById(decoded.userId)

  req.user = user
  next()
})


/**
 * Restricts access to users with specific roles.
 * Throws a ForbiddenError if the user doesn't have permission.
 * 
 * @param roles - list of allowed user roles.
 * @returns Express middleware function.
 */
export const restricTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ForbiddenError('You do not have permission to perform this action')
    }
    next()
  }
}