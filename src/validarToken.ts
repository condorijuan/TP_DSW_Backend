import e, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const validarToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    try {
      const tokenData = token.slice(7);
      const data = jwt.verify(tokenData, 'doctor-docto') as JwtPayload;
      req.body.id = data.id;
      req.body.tipo = data.tipo;
      next();
    }
    catch (error: any) {
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
