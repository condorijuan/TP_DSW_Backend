import { t } from "@mikro-orm/core";
import { Request, Response, NextFunction } from "express";
//import { TurnoRepository } from "./turno.repository.js";
import { Turno } from "./turno.entity.js";
import { orm } from "../shared/db/orm.js";
//const Repository = new TurnoRepository();

const em = orm.em;

function sanitizeTurno(req: Request, res: Response, next: NextFunction) {
    req.body.sanitize = {
        id: req.body.id,
        fecyhora: req.body.fecyhora,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        entrega: req.body.entrega,
        paciente: req.body.paciente,
        diente: req.body.diente,
        imagenes: req.body.imagenes,
        profesional: req.body.profesional
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
        const turnos = await em.find(Turno, {});
        res.status(200).json({ message: 'finded all Turno classes', data: turnos });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalido' });
        }
        const turno = await em.findOne(Turno, id);
        if (turno) {
            res.status(200).json({ message: 'Turno encontrado', data: turno });
        } else {
            res.status(404).json({ message: 'Turno no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function add(req: Request, res: Response) {
    try {
        const turno = em.create(Turno, req.body.sanitize);
        await em.persistAndFlush(turno);
        res.status(201).json({ message: 'Turno creado', data: turno });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalido' });
        }
        const turno = await em.findOne(Turno, id);
        if (turno) {
            em.assign(turno, req.body.sanitize);
            await em.persistAndFlush(turno);
            res.status(200).json({ message: 'Turno actualizado', data: turno });
        } else {
            res.status(404).json({ message: 'Turno no encontrado' });
        }
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalido' });
        }
        const turno = await em.findOne(Turno, id);
        if (turno) {
            await em.removeAndFlush(turno);
            res.status(200).json({ message: 'Turno eliminado', data: turno });
        } else {
            res.status(404).json({ message: 'Turno no encontrado' });
        }
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findByprofecional(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalido' });
        }
        const turnos = await em.find(Turno, { profesional: id });
        res.status(200).json({ message: 'Turnos encontrados', data: turnos });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findByPaciente(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID invalido' });
        }
        const turnos = await em.find(Turno, { paciente: id });
        res.status(200).json({ message: 'Turnos encontrados', data: turnos });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

async function findByFechaHora(req: Request, res: Response) {
    try {
        const fechahora = req.params.fechahora;
        const turnos = await em.find(Turno, { fecyhora: fechahora });
        res.status(200).json({ message: 'Turnos encontrados', data: turnos });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export { sanitizeTurno, findAll, findOne, add, remove, update, findByprofecional, findByPaciente, findByFechaHora };