const Excel = require('./../excel');
const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de gastos...', new Date());

    const archivoExcelGastos = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/Gastos-dim.xls`);
    const hojaDeExcelGastos = Excel.agregarHoja(archivoExcelGastos, 'Gastos');

    Object
      .values(Constantes.COLUMNAS_GASTOS_DIM)
      .forEach((value, indice) => Excel.escribirCelda(hojaDeExcelGastos, 0, indice, value));

    Constantes
      .GASTOS
      .forEach((gasto, gastoIndice) => {
        Object
          .values(gasto)
          .forEach((value, indice) => {
            if (typeof value === 'object') return;
            Excel.escribirCelda(hojaDeExcelGastos, gastoIndice + 1, indice, value)
          });
      });

    Excel
      .guardarArchivo(archivoExcelGastos)
      .then(() => console.log('Archivo creado correctamente', new Date()))
      .catch(console.log);

  },

};
