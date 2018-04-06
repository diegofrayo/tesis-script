const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de proveedores...', new Date());

    const archivoExcelProveedores = new xl.Workbook();
    const hojaDeExcelProveedores = archivoExcelProveedores.addWorksheet('Proveedores');

    Object
      .values(Constantes.COLUMNAS_PROVEEDORES)
      .forEach((value, indice) => {
        hojaDeExcelProveedores.cell(1, indice + 1).string(value);
      });

    Constantes
      .PROVEEDORES
      .forEach((proveedor, proveedorIndice) => {
        Object
          .values(proveedor)
          .forEach((value, indice) => {
            hojaDeExcelProveedores.cell(proveedorIndice + 2, indice + 1)[typeof value](value);
          });
      });

    archivoExcelProveedores.write(`./output/Proveedores.xlsx`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo creado correctamente', new Date());
      }
    });

  },

};
