const Utils = require('./../utils');

const gastos = [
  // Pescado
  {
    id: 'id',
    nombre: 'Trucha',
    categoria: 'PESCADO',
    rango_unidades: [4, 5],
    rango_precio: [11000, 13000],
    tipo_unidad: 'KILOS',
  },
  {
    id: 'id',
    nombre: 'Mojarra',
    categoria: 'PESCADO',
    rango_unidades: [20, 22],
    rango_precio: [6500, 8000],
    tipo_unidad: 'KILOS',
  },
  {
    id: 'id',
    nombre: 'Bocachico',
    categoria: 'PESCADO',
    rango_unidades: [10, 13],
    rango_precio: [3000, 4000],
    tipo_unidad: 'KILOS',
  },
  {
    id: 'id',
    nombre: 'Camaron',
    categoria: 'PESCADO',
    rango_unidades: [1, 3],
    rango_precio: [48000, 50000],
    tipo_unidad: 'BOLSA',
  },

  // Alimentos
  {
    id: 'id',
    nombre: 'Aceite',
    categoria: 'INSUMOS',
    rango_unidades: [20],
    rango_precio: [70000, 72000],
    tipo_unidad: 'LITROS',
  },
  {
    id: 'id',
    nombre: 'Arroz',
    categoria: 'INSUMOS',
    rango_unidades: [25],
    rango_precio: [26000, 28000],
    tipo_unidad: 'LIBRAS',
  },
  {
    id: 'id',
    nombre: 'Panela',
    categoria: 'INSUMOS',
    rango_unidades: [12],
    rango_precio: [58000, 60000],
    tipo_unidad: 'KILOS',
  },
  {
    id: 'id',
    nombre: 'Papa',
    categoria: 'INSUMOS',
    rango_unidades: [50],
    rango_precio: [30000, 33000],
    tipo_unidad: 'KILOS',
  },
  {
    id: 'id',
    nombre: 'Platano',
    categoria: 'INSUMOS',
    rango_unidades: [80],
    rango_precio: [70000, 80000],
    tipo_unidad: 'KILOS',
  },
  {
    id: 'id',
    nombre: 'Cebolla',
    categoria: 'INSUMOS',
    rango_unidades: [5],
    rango_precio: [5000, 7000],
    tipo_unidad: 'KILOS',
  },
  {
    id: 'id',
    nombre: 'Tomate',
    categoria: 'INSUMOS',
    rango_unidades: [25],
    rango_precio: [30000, 33000],
    tipo_unidad: 'KILOS',
  },

  // Nomina
  {
    id: 'id',
    nombre: 'Pago de toda la nomina',
    categoria: 'NOMINA',
    rango_unidades: [1],
    rango_precio: [25 * 800000 + 4 * 3000000 + 1 * 1500000 + 3000000],
    tipo_unidad: 'MENSUAL',
  },

  // Infraestructura
  {
    id: 'id',
    nombre: 'Agua',
    categoria: 'INFRAESTRUCTURA',
    rango_unidades: [1],
    rango_precio: [300000, 350000],
    tipo_unidad: 'MENSUAL',
  },
  {
    id: 'id',
    nombre: 'Luz',
    categoria: 'INFRAESTRUCTURA',
    rango_unidades: [1],
    rango_precio: [500000, 550000],
    tipo_unidad: 'MENSUAL',
  },
  {
    id: 'id',
    nombre: 'Gas',
    categoria: 'INFRAESTRUCTURA',
    rango_unidades: [1],
    rango_precio: [1300000, 1400000],
    tipo_unidad: 'MENSUAL',
  },
  {
    id: 'id',
    nombre: 'Telefonia/Internet',
    categoria: 'INFRAESTRUCTURA',
    rango_unidades: [1],
    rango_precio: [120000, 120000],
    tipo_unidad: 'MENSUAL',
  },

  // Bebidas
  {
    id: 'id',
    nombre: 'Canasta Productos Postobon',
    categoria: 'BEBIDAS',
    rango_unidades: [1],
    rango_precio: [34000],
    tipo_unidad: 'SEMANAL',
  },
  {
    id: 'id',
    nombre: 'Canasta Productos Coca Cola',
    categoria: 'BEBIDAS',
    rango_unidades: [1],
    rango_precio: [34000],
    tipo_unidad: 'SEMANAL',
  },
  {
    id: 'id',
    nombre: 'Canasta Productos Bavaria',
    categoria: 'BEBIDAS',
    rango_unidades: [1],
    rango_precio: [44000],
    tipo_unidad: 'SEMANAL',
  },

  // Publicidad
  {
    id: 'id',
    nombre: 'Publicidad web',
    categoria: 'PUBLICIDAD',
    rango_unidades: [1],
    rango_precio: [90000],
    tipo_unidad: 'MENSUAL',
  },
  {
    id: 'id',
    nombre: 'Vallas publicitarias',
    categoria: 'PUBLICIDAD',
    rango_unidades: [1],
    rango_precio: [110000],
    tipo_unidad: 'MENSUAL',
  },
];

module.exports = {
  generar: () =>
    gastos.map((item, index) => ({ ...item, id: `0${Utils.formatearNumero(index + 1)}` })),
};
