import { Repository } from "../shared/repository.js";
import { Paciente } from "./paciente.entity.js";

const pacientes = [new Paciente('123', 'Juan', 'Perez', 'Masculino', 'Calle 123', '123456', 'abc@gmail.com')]

export class PacienteRepository implements Repository<Paciente> {

  public findAll(): Paciente[] | undefined {
    return pacientes
  }

  public findOne(item: { id: string }): Paciente | undefined {
    return pacientes.find(paciente => paciente.dni === item.id);
  }

  public add(item: Paciente): Paciente | undefined {
    pacientes.push(item);
    return item;
  }

  public update(item: Paciente): Paciente | undefined {
    const pacienteIDX = pacientes.findIndex(paciente => paciente.dni === item.dni);
    if (pacienteIDX !== -1) {
      pacientes[pacienteIDX] = { ...pacientes[pacienteIDX], ...item };
    }
    return pacientes[pacienteIDX];
  }

  public delete(item: { id: string }): Paciente | undefined {
    const pacienteIDX = pacientes.findIndex(paciente => paciente.dni === item.id);
    if (pacienteIDX !== -1) {
      const PacienteDelete = pacientes[pacienteIDX];
      pacientes.splice(pacienteIDX, 1);
      return PacienteDelete;
    } else {
      return undefined;
    }
  }
}