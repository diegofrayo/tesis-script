const Utils = require('./../utils');

const platos = [
  // -------------- Arroces --------------
  {
    id: 'id',
    nombre: 'Arroz a la marinera',
    categoria: 'Arroces',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Arroz a la marinera con langostinos',
    categoria: 'Arroces',
    precio: { 2017: 26000 - 2000, 2018: 26000 },
  },
  {
    id: 'id',
    nombre: 'Arroz a la marinera con coco',
    categoria: 'Arroces',
    precio: { 2017: 25000 - 2000, 2018: 25000 },
  },
  {
    id: 'id',
    nombre: 'Arroz con camarón',
    categoria: 'Arroces',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Arroz con langostinos',
    categoria: 'Arroces',
    precio: { 2017: 35000 - 2000, 2018: 35000 },
  },

  // -------------- Cazuelas --------------
  {
    id: 'id',
    nombre: 'Cazuela de camarones',
    categoria: 'Cazuelas',
    precio: { 2017: 26000 - 1000, 2018: 26000 },
  },
  {
    id: 'id',
    nombre: 'Cazuela de mariscos',
    categoria: 'Cazuelas',
    precio: { 2017: 26000 - 1000, 2018: 26000 },
  },
  {
    id: 'id',
    nombre: 'Cazuela de pescado',
    categoria: 'Cazuelas',
    precio: { 2017: 17000 - 1000, 2018: 17000 },
  },
  {
    id: 'id',
    nombre: 'Cazuela de langostinos',
    categoria: 'Cazuelas',
    precio: { 2017: 35000 - 1000, 2018: 35000 },
  },

  // -------------- Especialidades --------------
  {
    id: 'id',
    nombre: 'Langosta rellena',
    categoria: 'Especialidades',
    precio: { 2017: 50000 - 2000, 2018: 50000 },
  },
  {
    id: 'id',
    nombre: 'Bandeja caribeña',
    categoria: 'Especialidades',
    precio: { 2017: 26000 - 2000, 2018: 26000 },
  },
  {
    id: 'id',
    nombre: 'Bandeja viña del mar',
    categoria: 'Especialidades',
    precio: { 2017: 30000 - 2000, 2018: 30000 },
  },
  {
    id: 'id',
    nombre: 'Camarones al ajillo',
    categoria: 'Especialidades',
    precio: { 2017: 19000 - 2000, 2018: 19000 },
  },
  {
    id: 'id',
    nombre: 'Camarones apanados',
    categoria: 'Especialidades',
    precio: { 2017: 18000 - 2000, 2018: 18000 },
  },
  {
    id: 'id',
    nombre: 'Camarones calientes',
    categoria: 'Especialidades',
    precio: { 2017: 19000 - 2000, 2018: 19000 },
  },
  {
    id: 'id',
    nombre: 'Langostinos apanados',
    categoria: 'Especialidades',
    precio: { 2017: 35000 - 2000, 2018: 35000 },
  },
  {
    id: 'id',
    nombre: 'Langostinos en salsa marinera',
    categoria: 'Especialidades',
    precio: { 2017: 35000 - 2000, 2018: 35000 },
  },
  {
    id: 'id',
    nombre: 'Paella a la marinera',
    categoria: 'Especialidades',
    precio: { 2017: 32000 - 2000, 2018: 32000 },
  },
  {
    id: 'id',
    nombre: 'Chuleta en salsa marinera',
    categoria: 'Especialidades',
    precio: { 2017: 26000 - 2000, 2018: 26000 },
  },
  {
    id: 'id',
    nombre: 'Espaguetis a la marinera',
    categoria: 'Especialidades',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Espaguetis con camarón',
    categoria: 'Especialidades',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Patacón a la marinera',
    categoria: 'Especialidades',
    precio: { 2017: 15000 - 2000, 2018: 15000 },
  },
  {
    id: 'id',
    nombre: 'Crema de pescado',
    categoria: 'Especialidades',
    precio: { 2017: 13000 - 2000, 2018: 13000 },
  },
  {
    id: 'id',
    nombre: 'Crema de camarones',
    categoria: 'Especialidades',
    precio: { 2017: 19000 - 2000, 2018: 19000 },
  },

  // -------------- Ceviches --------------
  {
    id: 'id',
    nombre: 'Ceviche de camarón',
    categoria: 'Ceviches',
    precio: { 2017: 18000 - 1000, 2018: 18000 },
  },
  {
    id: 'id',
    nombre: 'Ceviche de camarón con langostinos',
    categoria: 'Ceviches',
    precio: { 2017: 25000 - 1000, 2018: 25000 },
  },
  {
    id: 'id',
    nombre: 'Ceviche mixto',
    categoria: 'Ceviches',
    precio: { 2017: 18000 - 1000, 2018: 18000 },
  },
  {
    id: 'id',
    nombre: 'Ceviche bomba',
    categoria: 'Ceviches',
    precio: { 2017: 18000 - 1000, 2018: 18000 },
  },
  {
    id: 'id',
    nombre: 'Ceviche bomba especial con langostino',
    categoria: 'Ceviches',
    precio: { 2017: 25000 - 1000, 2018: 25000 },
  },
  {
    id: 'id',
    nombre: 'Cóctel de langostino',
    categoria: 'Ceviches',
    precio: { 2017: 35000 - 1000, 2018: 35000 },
  },

  // -------------- Pescados --------------
  {
    id: 'id',
    nombre: 'Pescado frito',
    categoria: 'Pescados',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Sancocho de pescado',
    categoria: 'Pescados',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Viudo de pescado',
    categoria: 'Pescados',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Chuleta de pescado',
    categoria: 'Pescados',
    precio: { 2017: 18000 - 2000, 2018: 18000 },
  },
  {
    id: 'id',
    nombre: 'Pescado en salsa',
    categoria: 'Pescados',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Pescado a la sabrosura del mar',
    categoria: 'Pescados',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Pescado al ajillo',
    categoria: 'Pescados',
    precio: { 2017: 20000 - 2000, 2018: 20000 },
  },
  {
    id: 'id',
    nombre: 'Pescado en salsa a la marinera',
    categoria: 'Pescados',
    precio: { 2017: 30000 - 2000, 2018: 30000 },
  },

  // -------------- Ejecutivos --------------
  {
    id: 'id',
    nombre: 'Ejecutivo con ',
    categoria: 'Ejecutivo',
    precio: { 2017: 10000, 2018: 10000 },
  },

  // -------------- Adicionales --------------
  {
    id: 'id',
    nombre: 'Porción de arroz',
    categoria: 'Adicionales',
    precio: { 2017: 1000, 2018: 1000 },
  },
  {
    id: 'id',
    nombre: 'Porción de arroz con coco',
    categoria: 'Adicionales',
    precio: { 2017: 2000, 2018: 2000 },
  },
  {
    id: 'id',
    nombre: 'Porción de patacón',
    categoria: 'Adicionales',
    precio: { 2017: 1000, 2018: 1000 },
  },
  {
    id: 'id',
    nombre: 'Caldo peligroso',
    categoria: 'Adicionales',
    precio: { 2017: 5000, 2018: 5000 },
  },


  // -------------- Bebidas --------------
  {
    id: 'id',
    nombre: 'Gaseosa 350ml',
    categoria: 'Bebidas',
    precio: { 2017: 2000, 2018: 2000 },
  },
  {
    id: 'id',
    nombre: 'Jugos hit',
    categoria: 'Bebidas',
    precio: { 2017: 2000, 2018: 2000 },
  },
  {
    id: 'id',
    nombre: 'Agua en botella',
    categoria: 'Bebidas',
    precio: { 2017: 2000, 2018: 2000 },
  },
  {
    id: 'id',
    nombre: 'Cerveza Póker',
    categoria: 'Bebidas',
    precio: { 2017: 2500, 2018: 2500 },
  },
  {
    id: 'id',
    nombre: 'Cerveza Costeña',
    categoria: 'Bebidas',
    precio: { 2017: 2500, 2018: 2500 },
  },
  {
    id: 'id',
    nombre: 'Cerveza Águila',
    categoria: 'Bebidas',
    precio: { 2017: 2500, 2018: 2500 },
  },
  {
    id: 'id',
    nombre: 'Cerveza Club Colombia',
    categoria: 'Bebidas',
    precio: { 2017: 3000, 2018: 3000 },
  },
  {
    id: 'id',
    nombre: 'Limonada de coco',
    categoria: 'Bebidas',
    precio: { 2017: 5000, 2018: 5000 },
  },
];

module.exports = {
  generar: () =>
    platos.map((item, index) => ({ ...item, id: `0${Utils.formatearNumero(index + 1)}` })),
};
