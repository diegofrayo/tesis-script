const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de tiempo...', new Date());

    const archivoExcelTiempo = new xl.Workbook();
    const hojaDeExcelTiempo = archivoExcelTiempo.addWorksheet('Tiempo');

    Object
      .values(Constantes.COLUMNAS_TIEMPO)
      .forEach((value, indice) => {
        hojaDeExcelTiempo.cell(1, indice + 1).string(value);
      });

    Constantes
      .TIEMPO
      .forEach((fecha, fechaIndice) => {
        Object
          .values(fecha)
          .forEach((value, indice) => {
            hojaDeExcelTiempo.cell(fechaIndice + 2, indice + 1)[typeof value](value);
          });
      });

    archivoExcelTiempo.write(`./output/Tiempo.xlsx`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
