import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Usuario } from "./usuario.entity.js";
import bcrypto from 'bcrypt';
import jwt from 'jsonwebtoken';


const em = orm.em

function sanitizeUsuario(req: Request, res: Response, next: NextFunction) {
  req.body.sanitize = {
    id: req.body.id,
    correo: req.body.correo,
    contrasena: req.body.contrasena,
    tipo: req.body.tipo,
  };

  Object.keys(req.body.sanitize).forEach(key => {
    if (req.body.sanitize[key] === undefined) {
      delete req.body.sanitize[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const usuarios = await em.find(Usuario, {});
    res.status(200).json({ message: 'Usuarios found', data: usuarios });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findbyEmail(req: Request, res: Response) {
  try {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    /*     //hash temporal//
        const temp = await bcrypto.hash(contrasena, 10);
        console.log(temp); */
    const usuario = await em.findOne(Usuario, { correo });
    if (usuario) {
      const validacion = await bcrypto.compare(contrasena, usuario.contrasena);
      if (!validacion) {
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
      const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo, profecional: usuario.profesional },
        'doctor-docto',
        { expiresIn: '1h' }
      );
      const { contrasena: _, profesional, ...usuarioData } = usuario;
      res.status(200).json({ token, data: usuarioData });
    } else {
      res.status(404).json({ message: 'Usuario not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const usuario = await em.findOne(Usuario, id);
    if (usuario) {
      res.status(200).json({ message: 'Usuario found', data: usuario });
    } else {
      res.status(404).json({ message: 'Usuario not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const usuario = em.create(Usuario, req.body.sanitize);
    await em.persistAndFlush(usuario);
    res.status(201).json({ message: 'Usuario created', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const usuario = await em.findOne(Usuario, id);
    if (usuario) {
      em.assign(usuario, req.body.sanitize);
      await em.persistAndFlush(usuario);
      res.status(200).json({ message: 'Usuario updated', data: usuario });
    } else {
      res.status(404).json({ message: 'Usuario not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const usuario = await em.findOne(Usuario, id);
    if (usuario) {
      await em.removeAndFlush(usuario);
      res.status(200).json({ message: 'Usuario deleted' });
    } else {
      res.status(404).json({ message: 'Usuario not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}



export { sanitizeUsuario, findOne, add, remove, update, findbyEmail, findAll };