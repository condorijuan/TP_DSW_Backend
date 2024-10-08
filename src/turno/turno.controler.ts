import { Request, Response, NextFunction } from "express";
//import { TurnoRepository } from "./turno.repository.js";
//import { Turno } from "./turno.entity.js";

//const Repository = new TurnoRepository();

function sanitizeTurno(req: Request, res: Response, next: NextFunction) {
    req.body.sanitize = {
        id: req.body.id,
        fecyhora: req.body.fecyhora,
        precio: req.body.precio,
        entrega: req.body.entrega,
        descripcion: req.body.descripcion,
        pieza: req.body.pieza,
    };

    Object.keys(req.body.sanitize).forEach(key => {
        if (req.body.sanitize[key] === undefined) {
            delete req.body.sanitize[key];
        }
    });

    next();
}

function findAll(req: Request, res: Response) {
    res.status(500).json({message: 'Not implemented'});
}

function findOne(req: Request, res: Response) {
    res.status(500).json({message: 'Not implemented'});
}

function add(req: Request, res: Response) {
    res.status(500).json({message: 'Not implemented'});
}

function update(req: Request, res: Response) {
    res.status(500).json({message: 'Not implemented'});
}

function remove(req: Request, res: Response) {
    res.status(500).json({message: 'Not implemented'});
}

export { sanitizeTurno, findAll, findOne, add, remove, update};