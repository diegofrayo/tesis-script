const fs = require('fs');
const constants = require('./constants');

const orden = {
  fecha: '05/05/2018',
  orden: 1,
  mesero: 'Diego Rayo',
  mesa: 5,
  tipo_cliente: 'INDIVIDUAL',
  numero_personas: 1,
  hora_llegada: '11:50',
  hora_toma_orden: '12:00',
  plato: 'Cazuela de mariscos',
  precio: 10500,
  costo_produccion: 8000,
  hora_entrega: '12:20',
  hora_pago: '12:50',
  valor_total: 10500,
  hora_salida_domiciliario: '-',
  hora_llegada_domiciliario: '-',
};

const transform = data => data.map(item => `${Object.values(item).join(';')}`).join('\n');

const createFile = data => {
  fs.writeFile('./output/Fuente de datos.csv', transform(data), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('The file was saved!');
    }
  });
};

createFile([constants.COLUMNAS, orden]);
