const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    const archivoExcelClientes = new xl.Workbook();
    const hojaDeExcelClientes = archivoExcelClientes.addWorksheet('Clientes');

    Object.values(Constantes.COLUMNAS_CLIENTES).forEach((value, indice) => {
      hojaDeExcelClientes.cell(1, indice + 1).string(value);
    });

    Constantes.CLIENTES.forEach((cliente, clienteIndice) => {
      Object.values(cliente).forEach((value, indice) => {
        hojaDeExcelClientes.cell(clienteIndice + 2, indice + 1).string(value);
      });
    });

    archivoExcelClientes.write(`./output/Clientes.xlsx`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log('Success...');
      }
    });

  },

};
