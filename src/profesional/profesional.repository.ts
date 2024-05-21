import { Repository } from "../shared/repository.js";
import { Profesional } from "./profesional.entity.js";

const profesionales = [new Profesional('123', 'Juan', 'Perez')]

export class ProfesionalRepository implements Repository<Profesional> {

  public findAll(): Profesional[] | undefined {
    return profesionales
  }

  public findOne(item: { id: string }): Profesional | undefined {
    return profesionales.find(profesional => profesional.id === item.id);
  }

  public add(item: Profesional): Profesional | undefined {
    profesionales.push(item);
    return item;
  }

  public update(item: Profesional): Profesional | undefined {
    const profesionalIDX = profesionales.findIndex(profesional => profesional.id === item.id);
    if (profesionalIDX !== -1) {
      profesionales[profesionalIDX] = { ...profesionales[profesionalIDX], ...item };
    }
    return profesionales[profesionalIDX];
  }

  public delete(item: { id: string }): Profesional | undefined {
    const profesionalIDX = profesionales.findIndex(profesional => profesional.id === item.id);
    if (profesionalIDX !== -1) {
      const profesionalDelete = profesionales[profesionalIDX];
      profesionales.splice(profesionalIDX, 1);
      return profesionalDelete;
    } else {
      return undefined;
    }
  }
}