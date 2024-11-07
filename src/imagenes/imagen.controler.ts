import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Imagen } from "./imagen.entity.js";

const em = orm.em

async function  findAll(req: Request, res: Response) {
    try {
        const imagenes = await em.find(Imagen, {},
            { populate: ['tipoImagen']}
        )
        res.status(200).json({message: 'found all imagen', data: imagenes })
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const character = await em.findOneOrFail(Imagen, {id},
            {populate: ['tipoImagen']}
        )
        res.status(200).json({message: 'found character', data: character})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response) {
    try {
        const imagen = em.create(Imagen, req.body)
        await em.flush()
        res.status(201).json({message: 'imagen created', data: imagen})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const imagenToUpdate = await em.findOneOrFail(Imagen, {id})
        em.assign(imagenToUpdate, req.body)
        await em.flush()
        res.status(200).json({message: 'imagen updated'});
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const imagen = em.getReference(Imagen, id)
        await em.removeAndFlush(imagen)
        res.status(200).send({message: 'imagen deleted'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export {findAll, findOne, add, remove, update};