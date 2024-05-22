import { Repository } from "../shared/repository.js";
import { Alergia } from "./alergias.entity.js";

const alergias = [new Alergia('1', 'Polen', 'Estornudos')]

export class alergiaRepository implements Repository<Alergia> {

  public findAll(): Alergia[] | undefined {
    return alergias
  }

  public findOne(item: { id: string }): Alergia | undefined {
    return alergias.find(alergia => alergia.nro_Codigo === item.id);
  }

  public add(item: Alergia): Alergia | undefined {
    alergias.push(item);
    return item;
  }

  public update(item: Alergia): Alergia | undefined {
    const alergiaIDX = alergias.findIndex(alergia => alergia.nro_Codigo === item.nro_Codigo);
    if (alergiaIDX !== -1) {
      alergias[alergiaIDX] = { ...alergias[alergiaIDX], ...item };
    }
    return alergias[alergiaIDX];
  }

  public delete(item: { id: string }): Alergia | undefined {
    const alergiaIDX = alergias.findIndex(alergia => alergia.nro_Codigo === item.id);
    if (alergiaIDX !== -1) {
      const alergiaDelete = alergias[alergiaIDX];
      alergias.splice(alergiaIDX, 1);
      return alergiaDelete;
    } else {
      return undefined;
    }
  }
}