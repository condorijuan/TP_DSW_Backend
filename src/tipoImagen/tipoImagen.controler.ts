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

async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const data = await em.findOneOrFail(TipoImagen, {id})
        res.json(data);
        /* res
        .status(200)
        .json({message: 'found tipoImagen class', data: tipoImagen}); */
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

async function add(req: Request, res: Response) {
    try {
        const tipoImagen = em.create(TipoImagen, req.body)
        await em.flush()
        res
            .status(201)
            .json({message: 'tipoImagen class created', data: tipoImagen});
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const tipoImagen = em.getReference(TipoImagen, id)
        em.assign(tipoImagen, req.body)
        await em.flush()
        res.status(200).json({message: 'tipoImagen updated'});
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const tipoImagen = em.getReference(TipoImagen, id)
        await em.removeAndFlush(tipoImagen)
        res.status(200).send({ message: 'tipoImagen deleted'})
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export {findAll, findOne, add, remove, update};