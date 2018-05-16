const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de platos...', new Date());

    const archivoExcelPlatos = new xl.Workbook();
    const hojaDeExcelPlatos = archivoExcelPlatos.addWorksheet('Platos');

    Object
      .values(Constantes.COLUMNAS_PLATOS)
      .forEach((value, indice) => {
        hojaDeExcelPlatos.cell(1, indice + 1).string(value);
      });

    Constantes
      .PLATOS
      .forEach((plato, platoIndice) => {
        Object
          .values(plato)
          .forEach((value, indice) => {
            if (typeof value === 'object') return;
            hojaDeExcelPlatos.cell(platoIndice + 2, indice + 1)[typeof value](value);
          });
      });

    archivoExcelPlatos.write(`./output/Platos.xls`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
