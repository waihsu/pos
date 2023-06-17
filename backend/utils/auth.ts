import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) return res.send(401);
  try {
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, config.jwtSecret);
    // @ts-ignore
    req["email"] = user.email;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
