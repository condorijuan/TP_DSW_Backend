import { Repository } from "../shared/repository.js";
import { Turno } from "./turno.entity.js";

const turnos = [new Turno('1', '2024 06 11 16:30Z', '$500', '$250', 'implante', '1.1')]

export class TurnoRepository implements Repository<Turno> {

    public findAll(): Turno[] | undefined {
        return turnos
    }

    public findOne(item: { id: string; }): Turno | undefined {
        return turnos.find((turno) => turno.id === item.id);
    }
    public add(item: Turno): Turno | undefined {
        turnos.push(item);
        return item;
    }
    
    public update(item: Turno): Turno | undefined {
        const turnoIDX = turnos.findIndex(turno => turno.id === item.id);
        if (turnoIDX !== -1) {
            turnos[turnoIDX] = { ...turnos[turnoIDX], ...item };
        }
        return turnos[turnoIDX];
    }

    public delete(item: { id: string; }): Turno | undefined {
        const turnoIDX = turnos.findIndex(turno => turno.id === item.id);
        if (turnoIDX !== -1) {
            const TurnoDelete = turnos[turnoIDX];
            turnos.splice(turnoIDX, 1);
            return TurnoDelete;
        } else {
            return undefined;
        }
    }
}



