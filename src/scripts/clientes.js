const fs = require('fs');

const Excel = require('./../excel');
const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de clientes...', new Date());

    const archivoExcelClientes = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/Clientes.xls`);
    const hojaDeExcelClientes = Excel.agregarHoja(archivoExcelClientes, 'Clientes');

    // fs.writeFile(`${Constantes.CARPETA_SALIDA}/Clientes.json`, JSON.stringify(Constantes.CLIENTES), () => {});

    Object
      .values(Constantes.COLUMNAS_CLIENTES)
      .forEach((value, indice) => Excel.escribirCelda(hojaDeExcelClientes, 0, indice, value));

    Constantes
      .CLIENTES
      .forEach((cliente, clienteIndice) => {
        Object
          .values(cliente)
          .forEach((value, indice) => {
            Excel.escribirCelda(hojaDeExcelClientes, clienteIndice + 1, indice, value)
          });
      });

    Excel
      .guardarArchivo(archivoExcelClientes)
      .then(() => console.log('Archivo creado correctamente', new Date()))
      .catch(console.log);

  },

};
