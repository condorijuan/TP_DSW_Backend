export class Paciente {
  constructor(
    public dni: string,
    public nombre: string,
    public apellido: string,
    public genero: string,
    public direccion: string,
    public telefono: string,
    public email: string,
  ) { }
}