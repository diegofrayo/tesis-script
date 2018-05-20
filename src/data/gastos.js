const Utils = require('./../utils');

const gastos = [
  // Pescado
  {
    id: 'id',
    nombre: 'Trucha',
    categoria: 'PESCADO',
  },
  {
    id: 'id',
    nombre: 'Mojarra',
    categoria: 'PESCADO',
  },
  {
    id: 'id',
    nombre: 'Camaron',
    categoria: 'PESCADO',
  },
  {
    id: 'id',
    nombre: 'Bocachico',
    categoria: 'PESCADO',
  },
  {
    id: 'id',
    nombre: 'Langostinos',
    categoria: 'PESCADO',
  },
  {
    id: 'id',
    nombre: 'Bagre basa',
    categoria: 'PESCADO',
  },
  {
    id: 'id',
    nombre: 'Capaz',
    categoria: 'PESCADO',
  },

  // Alimentos
  {
    id: 'id',
    nombre: 'Banano',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Limon',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Aceite',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Arroz',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Papa',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Platano',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Panela',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Cebolla',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Tomate',
    categoria: 'INSUMOS',
  },
  {
    id: 'id',
    nombre: 'Yuca',
    categoria: 'INSUMOS',
  },

  // Cocina
  {
    id: 'id',
    nombre: 'Vajilla',
    categoria: 'COCINA',
  },
  {
    id: 'id',
    nombre: 'Elementos para cocinar',
    categoria: 'COCINA',
  },
  {
    id: 'id',
    nombre: 'Desechables',
    categoria: 'COCINA',
  },

  // Nomina
  {
    id: 'id',
    nombre: 'Sueldos',
    categoria: 'NOMINA',
  },
  {
    id: 'id',
    nombre: 'Primas',
    categoria: 'NOMINA',
  },

  // Infraestructura
  {
    id: 'id',
    nombre: 'Agua',
    categoria: 'INFRAESTRUCTURA',
  },
  {
    id: 'id',
    nombre: 'Luz',
    categoria: 'INFRAESTRUCTURA',
  },
  {
    id: 'id',
    nombre: 'Gas',
    categoria: 'INFRAESTRUCTURA',
  },
  {
    id: 'id',
    nombre: 'Telefonia/Internet',
    categoria: 'INFRAESTRUCTURA',
  },
  {
    id: 'id',
    nombre: 'Articulos de limpieza',
    categoria: 'INFRAESTRUCTURA',
  },

  // Bebidas
  {
    id: 'id',
    nombre: 'Canasta Productos Postobon',
    categoria: 'BEBIDAS',
  },
  {
    id: 'id',
    nombre: 'Canasta Productos Coca Cola',
    categoria: 'BEBIDAS',
  },
  {
    id: 'id',
    nombre: 'Canasta Productos Bavaria',
    categoria: 'BEBIDAS',
  },

  // Publicidad
  {
    id: 'id',
    nombre: 'Publicidad web',
    categoria: 'PUBLICIDAD',
  },
  {
    id: 'id',
    nombre: 'Vallas publicitarias',
    categoria: 'PUBLICIDAD',
  },

  // Impuestos
  {
    id: 'id',
    nombre: 'Impuestos DIAN',
    categoria: 'IMPUESTOS',
  },
];

module.exports = {
  generar: () =>
    gastos.map((item, index) => ({ ...item, id: `0${Utils.formatearNumero(index + 1)}` })),
};
