const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de fechas...', new Date());

    const archivoExcelFechas = new xl.Workbook();
    const hojaDeExcelFechas = archivoExcelFechas.addWorksheet('Fechas');

    Object
      .values(Constantes.COLUMNAS_FECHAS)
      .forEach((value, indice) => {
        hojaDeExcelFechas.cell(1, indice + 1).string(value);
      });

    Constantes
      .FECHAS
      .forEach((fecha, fechaIndice) => {
        Object
          .values(fecha)
          .forEach((value, indice) => {
            hojaDeExcelFechas.cell(fechaIndice + 2, indice + 1)[typeof value](value);
          });
      });

    archivoExcelFechas.write(`./output/Fechas.xlsx`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
