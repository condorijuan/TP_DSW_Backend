import e, { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const validarAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (token) {
    try {
      const decodedToken: any = jwt.decode(token);
      if (decodedToken && decodedToken.tipo && decodedToken.tipo !== 'admin') {
        res.status(401).json({ message: 'no autorizado' });
      }
      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'token expirado', error });
      }
      return res.status(401).json({ message: 'token invalido', error });
    }

  }
  else {
    res.status(401).json({ message: 'token no proveido' });
  }
}
