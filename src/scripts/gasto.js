const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de insumos...', new Date());

    const archivoExcelInsumos = new xl.Workbook();
    const hojaDeExcelInsumos = archivoExcelInsumos.addWorksheet('Insumos');

    Object
      .values(Constantes.COLUMNAS_INSUMOS)
      .forEach((value, indice) => {
        hojaDeExcelInsumos.cell(1, indice + 1).string(value);
      });

    Constantes
      .INSUMOS
      .forEach((insumo, clienteIndice) => {
        Object
          .values(insumo)
          .forEach((value, indice) => {
            hojaDeExcelInsumos.cell(clienteIndice + 2, indice + 1)[typeof value](value);
          });
      });

    archivoExcelInsumos.write(`./output/Insumos.xlsx`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
