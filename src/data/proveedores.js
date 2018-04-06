const Utils = require('./../utils');

const proveedores = Utils
  .crearArreglo(5)
  .map(numero => ({
    id: numero,
    nombre: Utils.crearNombreEmpresa(),
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefono('EMPRESA'),
  }));

module.exports = {
  generar: () => Object.values(proveedores).sort(Utils.ordenar('nombre', 'asc')),
};
