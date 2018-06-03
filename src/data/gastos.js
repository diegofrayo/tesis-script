const Utils = require('./../utils');

const gastos = [
  // Pescado
  {
    id: 'id',
    nombre: 'Trucha',
    categoria: 'PESCADOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [4, 5],
    rango_precio: [11000, 13000],
  },
  {
    id: 'id',
    nombre: 'Mojarra',
    categoria: 'PESCADOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [20, 22],
    rango_precio: [6500, 8000],
  },
  {
    id: 'id',
    nombre: 'Bocachico',
    categoria: 'PESCADOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [10, 13],
    rango_precio: [3000, 4000],
  },
  {
    id: 'id',
    nombre: 'Camaron',
    categoria: 'PESCADOS',
    tipo_unidad: 'BOLSA',
    rango_unidades: [1, 3],
    rango_precio: [48000, 50000],
  },

  // Insumos
  {
    id: 'id',
    nombre: 'Aceite',
    categoria: 'INSUMOS',
    tipo_unidad: 'LITROS',
    rango_unidades: [20],
    rango_precio: [70000, 72000],
  },
  {
    id: 'id',
    nombre: 'Arroz',
    categoria: 'INSUMOS',
    tipo_unidad: 'LIBRAS',
    rango_unidades: [25],
    rango_precio: [26000, 28000],
  },
  {
    id: 'id',
    nombre: 'Panela',
    categoria: 'INSUMOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [12],
    rango_precio: [58000, 60000],
  },
  {
    id: 'id',
    nombre: 'Papa',
    categoria: 'INSUMOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [50],
    rango_precio: [30000, 33000],
  },
  {
    id: 'id',
    nombre: 'Platano',
    categoria: 'INSUMOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [80],
    rango_precio: [70000, 80000],
  },
  {
    id: 'id',
    nombre: 'Cebolla',
    categoria: 'INSUMOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [5],
    rango_precio: [5000, 7000],
  },
  {
    id: 'id',
    nombre: 'Tomate',
    categoria: 'INSUMOS',
    tipo_unidad: 'KILOS',
    rango_unidades: [25],
    rango_precio: [30000, 33000],
  },

  // Nomina
  {
    id: 'id',
    nombre: 'Pago de nomina mensual',
    categoria: 'NOMINA',
    tipo_unidad: 'PAGO MENSUAL',
    rango_unidades: [1],
    rango_precio: [(25 * 800000) + (4 * 3000000) + (1 * 1500000) + 3000000],
    // rango_precio: [(1 * 800000) + (1 * 3000000) + (1 * 1500000) + 3000000],
  },

  // Infraestructura
  {
    id: 'id',
    nombre: 'Agua',
    categoria: 'INFRAESTRUCTURA',
    tipo_unidad: 'PAGO MENSUAL',
    rango_unidades: [1],
    rango_precio: [300000, 350000],
  },
  {
    id: 'id',
    nombre: 'Luz',
    categoria: 'INFRAESTRUCTURA',
    tipo_unidad: 'PAGO MENSUAL',
    rango_unidades: [1],
    rango_precio: [500000, 550000],
  },
  {
    id: 'id',
    nombre: 'Gas',
    categoria: 'INFRAESTRUCTURA',
    tipo_unidad: 'PAGO MENSUAL',
    rango_unidades: [1],
    rango_precio: [1300000, 1400000],
  },
  {
    id: 'id',
    nombre: 'Telefonia/Internet',
    categoria: 'INFRAESTRUCTURA',
    tipo_unidad: 'PAGO MENSUAL',
    rango_unidades: [1],
    rango_precio: [120000, 120000],
  },

  // Bebidas
  {
    id: 'id',
    nombre: 'Canasta Productos Postobon',
    categoria: 'BEBIDAS',
    tipo_unidad: 'CANASTA',
    rango_unidades: [1],
    rango_precio: [34000],
  },
  {
    id: 'id',
    nombre: 'Canasta Productos Coca Cola',
    categoria: 'BEBIDAS',
    tipo_unidad: 'CANASTA',
    rango_unidades: [1],
    rango_precio: [34000],
  },
  {
    id: 'id',
    nombre: 'Canasta Productos Bavaria',
    categoria: 'BEBIDAS',
    tipo_unidad: 'CANASTA',
    rango_unidades: [1],
    rango_precio: [44000],
  },

  // Publicidad
  {
    id: 'id',
    nombre: 'Publicidad web',
    categoria: 'PUBLICIDAD',
    tipo_unidad: 'PAGO MENSUAL',
    rango_unidades: [1],
    rango_precio: [90000],
  },
  {
    id: 'id',
    nombre: 'Vallas publicitarias',
    categoria: 'PUBLICIDAD',
    tipo_unidad: 'PAGO MENSUAL',
    rango_unidades: [1],
    rango_precio: [110000],
  },
];

module.exports = {
  generar: () =>
    gastos.map((item, index) => ({ ...item, id: `0${Utils.formatearNumero(index + 1)}` })),
};
