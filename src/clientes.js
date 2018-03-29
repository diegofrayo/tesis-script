const Utils = require('./utils');

const clientes = Utils
  .crearArreglo(10)
  .map(indice => {

    const numero = indice + 1;

    if (indice % 2 === 0) {
      return {
        nombre: `Cliente ${numero}`,
        direccion: `Direccion ${numero}`,
        telefono: `Telefono ${numero}`,
        celular: `Celular ${numero}`,
        correo_electronico: `Correo Electronico ${numero}`,
        fecha_cumpleanos: `${numero}/2/2017`,
        tipo: 'INDIVIDUO',
      };
    }

    return {
      nombre: `Empresa ${numero}`,
      direccion: `Direccion ${numero}`,
      telefono: `Telefono ${numero}`,
      celular: `Celular ${numero}`,
      correo_electronico: `Correo Electronico ${numero}`,
      fecha_cumpleanos: `${numero}/2/2017`,
      tipo: 'EMPRESA',
    };
  });

module.exports = {
  generar: () => clientes,
};
