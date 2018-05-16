const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de meseros...', new Date());

    const archivoExcelMeseros = new xl.Workbook();
    const hojaDeExcelMeseros = archivoExcelMeseros.addWorksheet('Meseros');

    Object
      .values(Constantes.COLUMNAS_MESEROS)
      .forEach((value, indice) => {
        hojaDeExcelMeseros.cell(1, indice + 1).string(value);
      });

    Constantes
      .MESEROS
      .forEach((plato, platoIndice) => {
        Object
          .values(plato)
          .forEach((value, indice) => {
            if (typeof value === 'object') return;
            hojaDeExcelMeseros.cell(platoIndice + 2, indice + 1)[typeof value](value);
          });
      });

    archivoExcelMeseros.write(`./output/Meseros.xls`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
