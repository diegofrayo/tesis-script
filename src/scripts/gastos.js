const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de gastos...', new Date());

    const archivoExcelGastos = new xl.Workbook();
    const hojaDeExcelGastos = archivoExcelGastos.addWorksheet('Gastos');

    Object
      .values(Constantes.COLUMNAS_GASTOS)
      .forEach((value, indice) => {
        hojaDeExcelGastos.cell(1, indice + 1).string(value);
      });

    archivoExcelGastos.write(`./output/Gastos.xlsx`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
