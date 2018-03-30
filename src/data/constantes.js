const Clientes = require('./clientes');
const Platos = require('./platos');
const Utils = require('./../utils');

const COLUMNAS = [
  'ORDEN',
  'FECHA',
  'HORA',
  'NUMERO DE MESA',
  'TIPO DE CLIENTE',
  'NUMERO DE PERSONAS',
  'PLATO',
  'PRECIO',
  'UNIDADES',
  'VALOR TOTAL ORDEN',
  'NOMBRE CLIENTE',
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

  HORAS: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8],

  MINUTOS: Utils.crearArreglo(59),

  MESAS: Utils.crearArreglo(40).map(current => current + 1),

  NUMERO_PERSONAS: Utils.crearArreglo(10).map(current => current + 1),

  TIPOS_DE_CLIENTE: {
    INDIVIDUAL: ['INDIVIDUO'],
    DOS_PERSONAS: ['EMPRESA', 'FAMILIA', 'GRUPO', 'PAREJA'],
    GRUPAL: ['EMPRESA', 'FAMILIA', 'GRUPO'],
  },

  COLUMNAS_VENTAS_NORMAL: COLUMNAS,

  COLUMNAS_VENTAS_DOMICILIOS: COLUMNAS.concat(['DIRECCION CLIENTE']),

  COLUMNAS_CLIENTES: [
    'NOMBRE',
    'DIRECCION',
    'TELEFONO',
    'CELULAR',
    'CORREO ELECTRONICO',
    'FECHA CUMPLEANOS',
    'TIPO',
  ],

  CLIENTES: Clientes.generar(),

  PLATOS: Platos.generar(),

};
