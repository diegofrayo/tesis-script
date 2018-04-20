const Clientes = require('./clientes');
const Fechas = require('./fechas');
const Platos = require('./platos');
const Utils = require('./../utils');
// const Insumos = require('./insumos');

const COLUMNAS_VENTAS_RESTAURANTE = [
  'NUMERO DE FACTURA',
  'FECHA',
  'HORA TOMA ORDEN',
  'HORA FACTURACION',
  'NUMERO DE MESA',
  'CODIGO DEL PLATO',
  'PLATO',
  'PRECIO',
  'UNIDADES',
  'VALOR TOTAL ORDEN',
];

const COLUMNAS_VENTAS_DOMICILIOS = [
  'NUMERO DE FACTURA',
  'FECHA',
  'HORA TOMA ORDEN',
  'HORA FACTURACION',
  'CODIGO DEL PLATO',
  'PLATO',
  'PRECIO',
  'UNIDADES',
  'VALOR TOTAL ORDEN',
  'IDENTIFICADOR DE CLIENTE',
  'NOMBRE DEL CLIENTE',
];

module.exports = {

  MESES: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],

  YEARS: [2017, 2018],

  MINUTOS: Utils.crearArreglo(59),

  MESAS: Utils.crearArreglo(40),

  /*
  TIPOS_DE_CLIENTE: {
    INDIVIDUAL: ['INDIVIDUO'],
    DOS_PERSONAS: ['EMPRESA', 'FAMILIA', 'GRUPO', 'PAREJA'],
    GRUPO: ['EMPRESA', 'FAMILIA', 'GRUPO'],
  },
  */

  COLUMNAS_VENTAS_RESTAURANTE,

  COLUMNAS_VENTAS_DOMICILIOS,

  COLUMNAS_CLIENTES: [
    'IDENTIFICADOR',
    'NOMBRE',
    'DIRECCION',
    'TELEFONO',
    'GENERO',
    'TIPO',
  ],

  COLUMNAS_INSUMOS: ['IDENTIFICADOR', 'NOMBRE', 'TIPO_UNIDAD'],

  COLUMNAS_PROVEEDORES: ['IDENTIFICADOR', 'NOMBRE', 'DIRECCION', 'TELEFONO'],

  COLUMNAS_COMPRA_INSUMOS: [
    'NUMERO DE ORDEN',
    'FECHA',
    'HORA',
    'PROVEEDOR',
    'INSUMO',
    'PRECIO',
    'UNIDADES',
    'VALOR TOTAL ORDEN',
  ],

  COLUMNAS_FECHAS: ['FECHA', 'DIA', 'SEMANA', 'MES', 'AÑO'],

  CLIENTES: Clientes.generar(),

  PLATOS: Platos.generar(),

  FECHAS: Fechas.generar(),

  // INSUMOS: Insumos.generar(),

};
