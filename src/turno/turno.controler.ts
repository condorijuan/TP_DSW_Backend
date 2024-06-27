import { Request, Response, NextFunction } from "express";
import { TurnoRepository } from "./turno.repository.js";
import { Turno } from "./turno.entity.js";

const Repository = new TurnoRepository();

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
    res.json({ data: Repository.findAll() });
}

function findOne(req: Request, res: Response) {
    const turno = Repository.findOne({ id: req.params.id });

    if (!turno) {
        return res.status(404).send({ message: 'Not Found'});
    }
    res.json({ data: turno});
}

function add(req: Request, res: Response) {
    const input = req.body.sanitize;

    const turnoInput = new Turno(input.id, input.fecyhora, input.precio, input.entrega, input.descripcion, input.pieza);

    const turno = Repository.add(turnoInput);

    return res.status(201).json({ message: 'turno agregado', data: turno})
}

function update(req: Request, res: Response) {
    const input = req.body.sanitize;

    const turnoInput = new Turno(input.id, input.fecyhora, input.precio, input.entrega, input.descripcion, input.pieza);

    const turno = Repository.update(turnoInput);

    if (!turno) {
        return res.status(404).send({ message: 'Not Found' });
    }
}

function remove(req: Request, res: Response) {
    const id = req.params.id;
    const turno = Repository.delete({ id });
    console.log(turno);
    if (!turno) {
       return res.status(404).send({ message: 'Not Found'}); 
    } 
    else {
        return res.status(200).json({ message: 'turno encontrado', data: turno});
    }
}

export { sanitizeTurno, findAll, findOne, add, remove, update};