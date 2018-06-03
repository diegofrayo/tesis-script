const fs = require('fs');

const Utils = require('./../utils');

const clientes = Utils
  .crearArreglo(80)
  .map(numero => {
    const persona = Utils.crearPersona();
    return {
      id: numero,
      nombre: persona.nombre,
      direccion: Utils.crearDireccion(),
      telefono: Utils.crearTelefono('AMBOS'),
      genero: persona.genero,
      tipo: 'PERSONA',
    };
  })
  .reduce((acum, curr) => {
    acum[curr.nombre] = curr; // eslint-disable-line
    return acum;
  }, {});

const empresas = [
  'Coonorquin S.A',
  'Cooperativa Findia',
  'Global Tech',
  'Camara Comercio',
  'Pyletos',
  'C&M Abogados',
  'Seguridad Privada Antomil',
].map((nombre, indice) => ({
  id: Object.keys(clientes).length + indice + 1,
  nombre,
  direccion: Utils.crearDireccion(),
  telefono: Utils.crearTelefono('FIJO'),
  genero: 'EMPRESA',
  tipo: 'EMPRESA',
}));

module.exports = {
  generar: () => {
    const rutaArchivo = '/Users/diegofrayo/Documents/Carpeta-Compartida/Fuentes/Clientes.json';
    if (fs.existsSync(rutaArchivo)) {
      return JSON.parse(fs.readFileSync(rutaArchivo, 'utf8'));
    }
    return Object.values(clientes).concat(empresas).sort(Utils.ordenar('nombre', 'asc'));
  },
};
