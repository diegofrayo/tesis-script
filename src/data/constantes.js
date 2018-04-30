const Clientes = require('./clientes');
const Fechas = require('./fechas');
const Meseros = require('./meseros');
const Platos = require('./platos');
const Utils = require('./../utils');

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

  MESAS: Utils.crearArreglo(55),

  COLUMNAS_VENTAS_RESTAURANTE: [
    'NUMERO FACTURA',
    'FECHA',
    'HORA TOMA ORDEN',
    'HORA FACTURACION',
    'MESA',
    'CODIGO PLATO',
    'NOMBRE PLATO',
    'PRECIO PLATO',
    'UNIDADES',
    'VALOR TOTAL FACTURA',
    'CODIGO MESERO',
    'NOMBRE MESERO',
  ],

  COLUMNAS_VENTAS_DOMICILIOS: [
    'NUMERO DE FACTURA',
    'FECHA',
    'HORA TOMA ORDEN',
    'HORA FACTURACION',
    'CODIGO PLATO',
    'NOMBRE PLATO',
    'PRECIO PLATO',
    'UNIDADES',
    'VALOR TOTAL FACTURA',
    'CODIGO CLIENTE',
    'NOMBRE CLIENTE',
  ],

  COLUMNAS_GASTOS: [
    'FECHA',
    'GASTO',
    'TIPO GASTO',
    'CATEGORIA GASTO',
    'MONTO TOTAL',
    'UNIDADES',
    'TIPO UNIDAD',
  ],

  COLUMNAS_CLIENTES: ['IDENTIFICADOR', 'NOMBRE', 'DIRECCION', 'TELEFONO', 'GENERO', 'TIPO'],

  COLUMNAS_MESEROS: ['CODIGO', 'CEDULA', 'NOMBRE', 'DIRECCION', 'TELEFONO'],

  COLUMNAS_FECHAS: ['FECHA', 'DIA', 'SEMANA', 'MES', 'AÑO'],

  COLUMNAS_PLATOS: ['CODIGO', 'NOMBRE', 'CATEGORIA'],

  PLATOS: Platos.generar(),

  FECHAS: Fechas.generar(),

  MESEROS: Meseros.generar(),

  CLIENTES: Clientes.generar(),

};
