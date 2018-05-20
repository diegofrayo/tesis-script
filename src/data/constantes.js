const Clientes = require('./clientes');
const Fechas = require('./fechas');
const Gastos = require('./gastos');
const Meseros = require('./meseros');
const Platos = require('./platos');
const Proveedores = require('./proveedores');
const Tiempo = require('./tiempo');
const Utils = require('./../utils');

module.exports = {

  CARPETA_SALIDA: '/Users/diegofrayo/Documents/Carpeta-Compartida/Fuentes',

  YEARS: [2017, 2018],

  MINUTOS: Utils.crearArreglo(59),

  MESAS: Utils.crearArreglo(55),

  COLUMNAS_VENTAS_RESTAURANTE: [
    'NUMERO ORDEN',
    'FECHA',
    'HORA TOMA ORDEN',
    'HORA FACTURACION',
    'NUMERO MESA',
    'CODIGO PLATO',
    'NOMBRE PLATO',
    'PRECIO PLATO',
    'NUMERO UNIDADES',
    'VALOR TOTAL FACTURA',
    'CODIGO MESERO',
    'NOMBRE MESERO',
  ],

  COLUMNAS_VENTAS_DOMICILIOS: [
    'NUMERO PEDIDO',
    'FECHA',
    'HORA TOMA PEDIDO',
    'CODIGO PLATO',
    'NOMBRE PLATO',
    'PRECIO PLATO',
    'NUMERO UNIDADES',
    'VALOR TOTAL FACTURA',
    'CODIGO CLIENTE',
    'NOMBRE CLIENTE',
  ],

  COLUMNAS_GASTOS: [
    'FECHA',
    'CODIGO GASTO',
    'GASTO',
    'CATEGORIA',
    'NUMERO UNIDADES',
    'TIPO UNIDAD',
    'MONTO TOTAL',
    'CODIGO PROVEEDOR',
    'NOMBRE PROVEEDOR',
  ],

  COLUMNAS_CLIENTES: ['CODIGO', 'NOMBRE', 'DIRECCION', 'TELEFONO', 'GENERO', 'TIPO'],

  COLUMNAS_MESEROS: ['CODIGO', 'CEDULA', 'NOMBRE', 'DIRECCION', 'TELEFONO'],

  COLUMNAS_FECHAS: ['FECHA', 'DIA', 'MES', 'AÑO', 'NOMBRE MES', 'NOMBRE DIA'],

  COLUMNAS_TIEMPO: ['TIEMPO', 'HORA', 'MINUTOS', 'FRANJA HORARIA'],

  COLUMNAS_PLATOS: ['CODIGO', 'NOMBRE', 'CATEGORIA'],

  COLUMNAS_GASTOS_DIM: ['CODIGO', 'NOMBRE', 'CATEGORIA'],

  COLUMNAS_PROVEEDORES: ['CODIGO', 'NOMBRE', 'DIRECCION', 'TELEFONO'],

  PLATOS: Platos.generar(),

  FECHAS: Fechas.generar(),

  TIEMPO: Tiempo.generar(),

  MESEROS: Meseros.generar(),

  CLIENTES: Clientes.generar(),

  GASTOS: Gastos.generar(),

  PROVEEDORES: Proveedores.generar(),

};
