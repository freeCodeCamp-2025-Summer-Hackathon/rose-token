import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../services/prisma";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    name: string;
    role?: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ 
        message: "Access token is required",
        error: "UNAUTHORIZED" 
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    // Fetch user details from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true
      }
    });

    if (!user) {
      res.status(401).json({ 
        message: "User not found",
        error: "USER_NOT_FOUND" 
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(403).json({ 
      message: "Invalid or expired token",
      error: "INVALID_TOKEN" 
    });
    return;
  }
};

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ 
      message: "Authentication required",
      error: "AUTHENTICATION_REQUIRED" 
    });
    return;
  }

  if (req.user.role !== "ADMIN") {
    res.status(403).json({ 
      message: "Admin privileges required",
      error: "INSUFFICIENT_PRIVILEGES" 
    });
    return;
  }

  next();
};

// Optional authentication - user can be authenticated or not
export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      next();
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true
      }
    });

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Invalid token, but continue without user
    next();
  }
};

export type { AuthenticatedRequest };
