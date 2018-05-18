const fs = require('fs');

const Utils = require('./../utils');

const meseros = Utils
  .crearArreglo(8)
  .map(numero => {
    const persona = Utils.crearPersona();
    return {
      id: `0${Utils.formatearNumero(numero)}`,
      cedula: persona.cedula,
      nombre: persona.nombre,
      direccion: Utils.crearDireccion(),
      telefono: Utils.crearTelefono('CELULAR'),
    };
  })
  .reduce((acum, curr) => {
    acum[curr.nombre] = curr; // eslint-disable-line
    return acum;
  }, {});

module.exports = {
  generar: () => {
    if (fs.existsSync('./output/Meseros.json')) {
      return JSON.parse(fs.readFileSync('./output/Meseros.json', 'utf8'));
    }
    return Object.values(meseros).sort(Utils.ordenar('codigo', 'asc'));
  },
};
