const Utils = require('./../utils');

const proveedores = [
  {
    id: 'id',
    nombre: 'Pescaderia Martel',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoFijo(),
    categoria: 'PESCADERIA',
  },
  {
    id: 'id',
    nombre: 'Pez y mar',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoCelular(),
    categoria: 'PESCADERIA',
  },
  {
    id: 'id',
    nombre: 'Supermercado Don Juan',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoFijo(),
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Abarrotes El Descuento',
    direccion: Utils.crearDireccion(),
    telefono: Utils.crearTelefonoCelular(),
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Proveedor No Especificado',
    direccion: 'N/A',
    telefono: 'N/A',
    categoria: 'N/A',
  },
];

module.exports = {
  generar: () =>
    proveedores.map((item, index) => ({ ...item, id: `0${Utils.formatearNumero(index + 1)}` })),
};
