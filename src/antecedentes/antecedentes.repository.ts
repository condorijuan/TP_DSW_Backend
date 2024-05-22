import { Repository } from "../shared/repository.js";
import { Antecedente } from "./antecedentes.entity.js";

const antecedentes = [new Antecedente('1', 'genetico', 'diabetes', 'padre con diabetes'),]

export class antecedenteRepository implements Repository<Antecedente> {

  public findAll(): Antecedente[] | undefined {
    return antecedentes
  }

  public findOne(item: { id: string }): Antecedente | undefined {
    return antecedentes.find(antecedente => antecedente.cod_antecedente === item.id);
  }

  public add(item: Antecedente): Antecedente | undefined {
    antecedentes.push(item);
    return item;
  }

  public update(item: Antecedente): Antecedente | undefined {
    const antecedenteIDX = antecedentes.findIndex(antecedente => antecedente.cod_antecedente === item.cod_antecedente);
    if (antecedenteIDX !== -1) {
      antecedentes[antecedenteIDX] = { ...antecedentes[antecedenteIDX], ...item };
    }
    return antecedentes[antecedenteIDX];
  }

  public delete(item: { id: string }): Antecedente | undefined {
    const antecedenteIDX = antecedentes.findIndex(antecedente => antecedente.cod_antecedente === item.id);
    if (antecedenteIDX !== -1) {
      const AntecedenteDelete = antecedentes[antecedenteIDX];
      antecedentes.splice(antecedenteIDX, 1);
      return AntecedenteDelete;
    } else {
      return undefined;
    }
  }
}
