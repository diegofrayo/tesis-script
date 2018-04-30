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
    acum[curr.nombre] = curr;
    return acum;
  }, {});

module.exports = {
  generar: () => Object.values(clientes).sort(Utils.ordenar('nombre', 'asc')),
};
