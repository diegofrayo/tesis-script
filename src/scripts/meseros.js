const fs = require('fs');

const Excel = require('./../excel');
const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de meseros...', new Date());

    const archivoExcelMeseros = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/Meseros.xls`);
    const hojaDeExcelMeseros = Excel.agregarHoja(archivoExcelMeseros, 'Meseros');

    // fs.writeFile(`${Constantes.CARPETA_SALIDA}/Meseros.json`, JSON.stringify(Constantes.MESEROS), () => {});

    Object
      .values(Constantes.COLUMNAS_MESEROS)
      .forEach((value, indice) => Excel.escribirCelda(hojaDeExcelMeseros, 0, indice, value));

    Constantes
      .MESEROS
      .forEach((mesero, meseroIndice) => {
        Object
          .values(mesero)
          .forEach((value, indice) => {
            Excel.escribirCelda(hojaDeExcelMeseros, meseroIndice + 1, indice, value)
          });
      });

    Excel
      .guardarArchivo(archivoExcelMeseros)
      .then(() => console.log('Archivo creado correctamente', new Date()))
      .catch(console.log);

  },

};
