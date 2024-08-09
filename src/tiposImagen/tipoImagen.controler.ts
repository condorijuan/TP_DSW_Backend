import { Request, Response,NextFunction } from "express";

function sanitizetipoImagen(req: Request, res: Response, next: NextFunction) {
    req.body.sanitize = {
        id: req.body.id,
        descripcion: req.body.descripcion
    };
    
    Object.keys(req.body.sanitizeInput).forEach((key) => {
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

export {sanitizetipoImagen, findAll, findOne, add, remove, update};