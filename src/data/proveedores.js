const Utils = require('./../utils');

const proveedores = [
  {
    id: 'id',
    nombre: 'Pescaderia Martel',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoFijo(),
  },
  {
    id: 'id',
    nombre: 'Pez y mar',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoCelular(),
  },
  {
    id: 'id',
    nombre: 'Supermercado Don Juan',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoFijo(),
  },
  {
    id: 'id',
    nombre: 'Abarrotes El Descuento',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoCelular(),
  },
  {
    id: 'id',
    nombre: 'Proveedor No Especificado',
    direccion: 'N/A',
    telefono: 'N/A',
  },
];

module.exports = {
  generar: () =>
    proveedores.map((item, index) => ({ ...item, id: `0${Utils.formatearNumero(index + 1)}` })),
};
