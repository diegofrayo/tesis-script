const Clientes = require('./clientes');
const Platos = require('./platos');
const Utils = require('./../utils');

const COLUMNAS_VENTAS_RESTAURANTE = [
  'NUMERO DE ORDEN',
  'FECHA',
  'HORA',
  'TIPO DE CLIENTE',
  'NUMERO DE MESA',
  'NUMERO DE PERSONAS',
  'PLATO',
  'PRECIO',
  'UNIDADES',
  'VALOR TOTAL ORDEN',
];

const COLUMNAS_VENTAS_DOMICILIOS = [
  'NUMERO DE ORDEN',
  'FECHA',
  'HORA',
  'TIPO DE CLIENTE',
  'NUMERO DE PERSONAS',
  'PLATO',
  'PRECIO',
  'UNIDADES',
  'VALOR TOTAL ORDEN',
  'IDENTIFICADOR DE CLIENTE',
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

  TIPOS_DE_CLIENTE: {
    INDIVIDUAL: ['INDIVIDUO'],
    DOS_PERSONAS: ['EMPRESA', 'FAMILIA', 'GRUPO', 'PAREJA'],
    GRUPO: ['EMPRESA', 'FAMILIA', 'GRUPO'],
  },

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

  CLIENTES: Clientes.generar(),

  PLATOS: Platos.generar(),

};
