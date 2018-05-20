const Excel = require('./../excel');
const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de tiempos...', new Date());

    const archivoExcelTiempo = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/Tiempo.xls`);
    const hojaDeExcelTiempo = Excel.agregarHoja(archivoExcelTiempo, 'Tiempo');

    Object
      .values(Constantes.COLUMNAS_TIEMPO)
      .forEach((value, indice) => Excel.escribirCelda(hojaDeExcelTiempo, 0, indice, value));

    Constantes
      .TIEMPO
      .forEach((tiempo, tiempoIndice) => {
        Object
          .values(tiempo)
          .forEach((value, indice) => {
            Excel.escribirCelda(hojaDeExcelTiempo, tiempoIndice + 1, indice, value)
          });
      });

    Excel
      .guardarArchivo(archivoExcelTiempo)
      .then(() => console.log('Archivo creado correctamente', new Date()))
      .catch(console.log);

  },

};
