const fs = require('fs');

const Utils = require('./../utils');

const clientes = Utils
  .crearArreglo(87)
  .map(numero => {

    if (numero <= 80) {
      const persona = Utils.crearPersona();
      return {
        id: numero,
        nombre: persona.nombre,
        direccion: Utils.crearDireccion(),
        telefono: Utils.crearTelefono('AMBOS'),
        genero: persona.genero,
        tipo: 'PERSONA',
      };
    }

    return {
      id: numero,
      nombre: Utils.crearNombreEmpresa(),
      direccion: Utils.crearDireccion(),
      telefono: Utils.crearTelefono('FIJO'),
      genero: 'EMPRESA',
      tipo: 'EMPRESA',
    };
  })
  .reduce((acum, curr) => {
    acum[curr.nombre] = curr; // eslint-disable-line
    return acum;
  }, {});

module.exports = {
  generar: () => {
    const rutaArchivo = '/Users/diegofrayo/Documents/Carpeta-Compartida/Fuentes/Clientes.json';
    if (fs.existsSync(rutaArchivo)) {
      return JSON.parse(fs.readFileSync(rutaArchivo, 'utf8'));
    }
    return Object.values(clientes).sort(Utils.ordenar('nombre', 'asc'));
  },
};
