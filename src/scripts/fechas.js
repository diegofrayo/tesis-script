const Excel = require('./../excel');
const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de fechas...', new Date());

    const archivoExcelFechas = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/Fechas.xls`);
    const hojaDeExcelFechas = Excel.agregarHoja(archivoExcelFechas, 'Fechas');

    Object
      .values(Constantes.COLUMNAS_FECHAS)
      .forEach((value, indice) => Excel.escribirCelda(hojaDeExcelFechas, 0, indice, value));

    Constantes
      .FECHAS
      .forEach((fecha, fechaIndice) => {
        Object
          .values(fecha)
          .forEach((value, indice) => {
            Excel.escribirCelda(hojaDeExcelFechas, fechaIndice + 1, indice, value)
          });
      });

    Excel
      .guardarArchivo(archivoExcelFechas)
      .then(() => console.log('Archivo creado correctamente', new Date()))
      .catch(console.log);

  },

};
