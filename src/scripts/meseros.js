const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node
const fs = require('fs');

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

    fs.writeFile('./output/Meseros.json', JSON.stringify(Constantes.MESEROS), () => {});

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

    archivoExcelMeseros.write(`./output/Meseros.xlsx`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
