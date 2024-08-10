import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { TipoImagen } from "./tipoImagen.entity.js";

const em = orm.em

async function findAll(req: Request, res: Response) {
    try {
        const tiposImagen = await em.find(TipoImagen, {})
        res.status(200).json({ message: 'finded all tipoImagen classes', data: tiposImagen })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
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

export {findAll, findOne, add, remove, update};