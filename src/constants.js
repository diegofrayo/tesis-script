module.exports = {
  HORAS: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8],

  MINUTOS: Array.from(Array(59).keys()),

  MESAS: Array.from(Array(40).keys()).map(current => current + 1),

  PERSONAS: Array.from(Array(10).keys()).map(current => current + 1),

  TIPOS_DE_CLIENTE: {
    INDIVIDUAL: ['INDIVIDUO'],
    DOS_PERSONAS: ['EMPRESA', 'FAMILIA', 'GRUPO', 'PAREJA'],
    GRUPAL: ['EMPRESA', 'FAMILIA', 'GRUPO'],
  },

  COLUMNAS: [
    'FECHA',
    'HORA',
    'ORDEN',
    'NUMERO DE MESA',
    'TIPO DE CLIENTE',
    'NUMERO DE PERSONAS',
    'PLATO',
    'PRECIO',
    'UNIDAD',
    'VALOR TOTAL',
    'CLIENTE',
  ],

  CLIENTES: ['EMPRESA A', 'EMPRESA B', 'EMPRESA C', 'EMPRESA D'],

  PLATOS: [
    {
      nombre: 'Arroz a la marinera',
      categoria: 'Arroces',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Arroz a la marinera con langostinos',
      categoria: 'Arroces',
      precio: { 2017: 26000 - 2000, 2018: 26000 },
      costo_produccion: { 2017: 26000 - 2000 - 5000, 2018: 26000 - 5000 },
    },
    {
      nombre: 'Arroz a la marinera con coco',
      categoria: 'Arroces',
      precio: { 2017: 25000 - 2000, 2018: 25000 },
      costo_produccion: { 2017: 25000 - 2000 - 5000, 2018: 25000 - 5000 },
    },
    {
      nombre: 'Arroz con camarón',
      categoria: 'Arroces',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Arroz con langostinos',
      categoria: 'Arroces',
      precio: { 2017: 35000 - 2000, 2018: 35000 },
      costo_produccion: { 2017: 35000 - 2000 - 5000, 2018: 35000 - 5000 },
    },

    {
      nombre: 'Cazuela de camarones',
      categoria: 'Cazuelas',
      precio: { 2017: 26000 - 1000, 2018: 26000 },
      costo_produccion: { 2017: 26000 - 1000 - 4000, 2018: 26000 - 4000 },
    },
    {
      nombre: 'Cazuela de mariscos',
      categoria: 'Cazuelas',
      precio: { 2017: 26000 - 1000, 2018: 26000 },
      costo_produccion: { 2017: 26000 - 1000 - 4000, 2018: 26000 - 4000 },
    },
    {
      nombre: 'Cazuela de pescado',
      categoria: 'Cazuelas',
      precio: { 2017: 17000 - 1000, 2018: 17000 },
      costo_produccion: { 2017: 17000 - 1000 - 4000, 2018: 17000 - 4000 },
    },
    {
      nombre: 'Cazuela de langostinos',
      categoria: 'Cazuelas',
      precio: { 2017: 35000 - 1000, 2018: 35000 },
      costo_produccion: { 2017: 35000 - 1000 - 4000, 2018: 35000 - 4000 },
    },

    {
      nombre: 'Langosta rellena',
      categoria: 'Especialidades',
      precio: { 2017: 50000 - 2000, 2018: 50000 },
      costo_produccion: { 2017: 50000 - 2000 - 5000, 2018: 50000 - 5000 },
    },
    {
      nombre: 'Bandeja caribeña',
      categoria: 'Especialidades',
      precio: { 2017: 26000 - 2000, 2018: 26000 },
      costo_produccion: { 2017: 26000 - 2000 - 5000, 2018: 26000 - 5000 },
    },
    {
      nombre: 'Bandeja viña del mar',
      categoria: 'Especialidades',
      precio: { 2017: 30000 - 2000, 2018: 30000 },
      costo_produccion: { 2017: 30000 - 2000 - 5000, 2018: 30000 - 5000 },
    },
    {
      nombre: 'Camarones al ajillo',
      categoria: 'Especialidades',
      precio: { 2017: 19000 - 2000, 2018: 19000 },
      costo_produccion: { 2017: 19000 - 2000 - 5000, 2018: 19000 - 5000 },
    },
    {
      nombre: 'Camarones apanados',
      categoria: 'Especialidades',
      precio: { 2017: 18000 - 2000, 2018: 18000 },
      costo_produccion: { 2017: 18000 - 2000 - 5000, 2018: 18000 - 5000 },
    },
    {
      nombre: 'Camarones calientes',
      categoria: 'Especialidades',
      precio: { 2017: 19000 - 2000, 2018: 19000 },
      costo_produccion: { 2017: 19000 - 2000 - 5000, 2018: 19000 - 5000 },
    },
    {
      nombre: 'Langostinos apanados',
      categoria: 'Especialidades',
      precio: { 2017: 35000 - 2000, 2018: 35000 },
      costo_produccion: { 2017: 35000 - 2000 - 5000, 2018: 35000 - 5000 },
    },
    {
      nombre: 'Langostinos en salsa marinera',
      categoria: 'Especialidades',
      precio: { 2017: 35000 - 2000, 2018: 35000 },
      costo_produccion: { 2017: 35000 - 2000 - 5000, 2018: 35000 - 5000 },
    },
    {
      nombre: 'Paella a la marinera',
      categoria: 'Especialidades',
      precio: { 2017: 32000 - 2000, 2018: 32000 },
      costo_produccion: { 2017: 32000 - 2000 - 5000, 2018: 32000 - 5000 },
    },
    {
      nombre: 'Chuleta en salsa marinera',
      categoria: 'Especialidades',
      precio: { 2017: 26000 - 2000, 2018: 26000 },
      costo_produccion: { 2017: 26000 - 2000 - 5000, 2018: 26000 - 5000 },
    },
    {
      nombre: 'Espaguetis a la marinera',
      categoria: 'Especialidades',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Espaguetis con camarón',
      categoria: 'Especialidades',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Patacón a la marinera',
      categoria: 'Especialidades',
      precio: { 2017: 15000 - 2000, 2018: 15000 },
      costo_produccion: { 2017: 15000 - 2000 - 5000, 2018: 15000 - 5000 },
    },
    {
      nombre: 'Crema de pescado',
      categoria: 'Especialidades',
      precio: { 2017: 13000 - 2000, 2018: 13000 },
      costo_produccion: { 2017: 13000 - 2000 - 5000, 2018: 13000 - 5000 },
    },
    {
      nombre: 'Crema de camarones',
      categoria: 'Especialidades',
      precio: { 2017: 19000 - 2000, 2018: 19000 },
      costo_produccion: { 2017: 19000 - 2000 - 5000, 2018: 19000 - 5000 },
    },

    {
      nombre: 'Ceviche de camarón',
      categoria: 'Ceviches',
      precio: { 2017: 18000 - 1000, 2018: 18000 },
      costo_produccion: { 2017: 18000 - 1000 - 4000, 2018: 18000 - 4000 },
    },
    {
      nombre: 'Ceviche de camarón con langostinos',
      categoria: 'Ceviches',
      precio: { 2017: 25000 - 1000, 2018: 25000 },
      costo_produccion: { 2017: 25000 - 1000 - 4000, 2018: 25000 - 4000 },
    },
    {
      nombre: 'Ceviche mixto',
      categoria: 'Ceviches',
      precio: { 2017: 18000 - 1000, 2018: 18000 },
      costo_produccion: { 2017: 18000 - 1000 - 4000, 2018: 18000 - 4000 },
    },
    {
      nombre: 'Ceviche bomba',
      categoria: 'Ceviches',
      precio: { 2017: 18000 - 1000, 2018: 18000 },
      costo_produccion: { 2017: 18000 - 1000 - 4000, 2018: 18000 - 4000 },
    },
    {
      nombre: 'Ceviche bomba especial con langostino',
      categoria: 'Ceviches',
      precio: { 2017: 25000 - 1000, 2018: 25000 },
      costo_produccion: { 2017: 25000 - 1000 - 4000, 2018: 25000 - 4000 },
    },
    {
      nombre: 'Cóctel de langostino',
      categoria: 'Ceviches',
      precio: { 2017: 35000 - 1000, 2018: 35000 },
      costo_produccion: { 2017: 35000 - 1000 - 4000, 2018: 35000 - 4000 },
    },

    {
      nombre: 'Pescado frito',
      categoria: 'Pescados',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Sancocho de pescado',
      categoria: 'Pescados',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Viudo de pescado',
      categoria: 'Pescados',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Chuleta de pescado',
      categoria: 'Pescados',
      precio: { 2017: 18000 - 2000, 2018: 18000 },
      costo_produccion: { 2017: 18000 - 2000 - 5000, 2018: 18000 - 5000 },
    },
    {
      nombre: 'Pescado en salsa',
      categoria: 'Pescados',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Pescaso a la sabrosura del mar',
      categoria: 'Pescados',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Pescado al ajillo',
      categoria: 'Pescados',
      precio: { 2017: 20000 - 2000, 2018: 20000 },
      costo_produccion: { 2017: 20000 - 2000 - 5000, 2018: 20000 - 5000 },
    },
    {
      nombre: 'Pescado en salsa a la marinera',
      categoria: 'Pescados',
      precio: { 2017: 30000 - 2000, 2018: 30000 },
      costo_produccion: { 2017: 30000 - 2000 - 5000, 2018: 30000 - 5000 },
    },

    {
      nombre: 'Porción de arroz',
      categoria: 'Adicionales',
      precio: { 2017: 1000, 2018: 1000 },
      costo_produccion: { 2017: 1000 / 2, 2018: 1000 / 2 },
    },
    {
      nombre: 'Porción de arroz con coco',
      categoria: 'Adicionales',
      precio: { 2017: 2000, 2018: 2000 },
      costo_produccion: { 2017: 2000 / 2, 2018: 2000 / 2 },
    },
    {
      nombre: 'Porción de patacón',
      categoria: 'Adicionales',
      precio: { 2017: 1000, 2018: 1000 },
      costo_produccion: { 2017: 1000 / 2, 2018: 1000 / 2 },
    },
    {
      nombre: 'Caldo peligroso',
      categoria: 'Adicionales',
      precio: { 2017: 5000, 2018: 5000 },
      costo_produccion: { 2017: 5000 / 2, 2018: 5000 / 2 },
    },
    {
      nombre: 'Porción de pescado',
      categoria: 'Adicionales',
      precio: { 2017: 10000, 2018: 10000 },
      costo_produccion: { 2017: 10000 / 2, 2018: 10000 / 2 },
    },

    {
      nombre: 'Gaseosa 350ml',
      categoria: 'Bebidas',
      precio: { 2017: 2000, 2018: 2000 },
      costo_produccion: { 2017: 2000 - 500, 2018: 2000 - 500 },
    },
    {
      nombre: 'Jugos hit',
      categoria: 'Bebidas',
      precio: { 2017: 2000, 2018: 2000 },
      costo_produccion: { 2017: 2000 - 500, 2018: 2000 - 500 },
    },
    {
      nombre: 'Agua en botella',
      categoria: 'Bebidas',
      precio: { 2017: 2000, 2018: 2000 },
      costo_produccion: { 2017: 2000 - 500, 2018: 2000 - 500 },
    },
    {
      nombre: 'Cerveza Póker',
      categoria: 'Bebidas',
      precio: { 2017: 2500, 2018: 2500 },
      costo_produccion: { 2017: 2500 - 500, 2018: 2500 - 500 },
    },
    {
      nombre: 'Cerveza Costeña',
      categoria: 'Bebidas',
      precio: { 2017: 2500, 2018: 2500 },
      costo_produccion: { 2017: 2500 - 500, 2018: 2500 - 500 },
    },
    {
      nombre: 'Cerveza Águila',
      categoria: 'Bebidas',
      precio: { 2017: 2500, 2018: 2500 },
      costo_produccion: { 2017: 2500 - 500, 2018: 2500 - 500 },
    },
    {
      nombre: 'Cerveza Club Colombia',
      categoria: 'Bebidas',
      precio: { 2017: 3000, 2018: 3000 },
      costo_produccion: { 2017: 3000 - 500, 2018: 3000 - 500 },
    },
    {
      nombre: 'Limonada de coco',
      categoria: 'Bebidas',
      precio: { 2017: 5000, 2018: 5000 },
      costo_produccion: { 2017: 5000 - 500, 2018: 5000 - 500 },
    },
  ].map((item, index) => ({ id: index + 1, ...item })),
};
